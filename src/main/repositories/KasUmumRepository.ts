import { Saldo } from 'global/types/TataUsaha'
import { KasUmum } from 'main/models/KasUmum'
import { TarikTunaiBKU } from 'main/types/KasUmum'
import CommonUtils from 'main/utils/CommonUtils'
import { err, ok, Result } from 'neverthrow'
import {
  Connection,
  createQueryBuilder,
  getManager,
  Like,
  Repository,
} from 'typeorm'

export class KasUmumRepository {
  private conn: Connection
  private repo: Repository<KasUmum>

  constructor(conn: Connection) {
    this.conn = conn
    this.repo = conn.getRepository(KasUmum)
  }

  async Upsert(kasUmum: KasUmum) {
    return await this.repo.upsert(kasUmum, ['idKasUmum'])
  }

  async BulkInsert(kasUmumList: KasUmum[]) {
    return await this.repo.insert(kasUmumList)
  }

  private async rawQuery<T = any[]>(
    query: string,
    parameters: any
  ): Promise<T> {
    const [escapedQuery, escapedParams] =
      this.conn.driver.escapeQueryWithParameters(query, parameters, {})
    return this.conn.query(escapedQuery, escapedParams)
  }

  async GetNextNoBukti(kodeBku: string): Promise<string> {
    const latestNoBukti = await this.repo.findOne({
      noBukti: Like(`${kodeBku}%`),
    })
    if (latestNoBukti === undefined) {
      return `${kodeBku}01`
    }

    const matches = latestNoBukti.noBukti.replace(/[^0-9]/g, '')
    let parsed = parseInt(matches, 10)
    if (isNaN(parsed)) {
      return `${kodeBku}01`
    }

    parsed++
    return kodeBku + parsed.toString().padStart(2, '0')
  }

  async GetTotalSaldo(
    idAnggaran: string,
    startDate: Date,
    endDate: Date
  ): Promise<Result<Saldo, Error>> {
    let result: Saldo
    const query = `
    select 
    (select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:idAnggaran and soft_delete=0 and tanggal_transaksi >= :startDate and tanggal_transaksi < :endDate and id_ref_bku in (8,5,2,6)) - 
    (select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:idAnggaran and soft_delete=0 and tanggal_transaksi >= :startDate and tanggal_transaksi < :endDate and id_ref_bku in (3,7,14,15)) as sisaBank,
    (select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:idAnggaran and soft_delete=0 and tanggal_transaksi >= :startDate and tanggal_transaksi < :endDate and id_ref_bku in (3,9)) - 
    (select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:idAnggaran and soft_delete=0 and tanggal_transaksi >= :startDate and tanggal_transaksi < :endDate and id_ref_bku in (4,5)) as sisaTunai;
    `
    const entityManager = getManager()
    const fetch = await entityManager
      .query(query, [
        {
          idAnggaran: idAnggaran,
          startDate: CommonUtils.formatDateToString(startDate),
          endDate: CommonUtils.formatDateToString(endDate),
        },
      ])
      .catch((e) => {
        console.error('Error when fetching query:', e)
        return err(new Error(e))
      })

    if (fetch !== undefined) {
      const list = <Saldo[]>fetch
      if (list.length > 0) {
        result = <Saldo>{
          sisaBank: list[0].sisaBank,
          sisaTunai: list[0].sisaTunai,
        }
      }
    }

    return ok(result)
  }

  async GetTotalSaldoDibelanjakan(
    idAnggaran: string,
    idPeriode: number[]
  ): Promise<number> {
    const result = await createQueryBuilder('kas_umum', 'ku')
      .select('ifnull(sum(ku.saldo),0) as sudahDibelanjakan')
      .innerJoin(
        'rapbs_periode',
        'rp',
        'rp.id_rapbs_periode = ku.id_rapbs_periode'
      )
      .where(
        `ku.id_anggaran = :idAnggaran 
        AND ku.id_ref_bku in (4,15)
        AND rp.id_periode in (:...idPeriode)`,
        {
          idAnggaran,
          idPeriode,
        }
      )
      .andWhere('ku.soft_delete = 0 ')
      .andWhere('rp.soft_delete = 0 ')
      .getRawOne()

    if (result !== undefined) {
      return result.sudahDibelanjakan
    }

    return 0
  }

  async GetTotalPerluDianggarkanUlang(
    idAnggaran: string,
    listIdPeriode: number[]
  ): Promise<number> {
    const query = `
    select 
      sum(perlu_dianggarkan_ulang) as totalPerluDianggarkanUlang 
    from 
      (
        select 
        case 
            when sum(volume_rencana) = sum(volume_realisasi)
            then sum(total_rencana) - sum(total_realisasi)
            else 0
        end as perlu_dianggarkan_ulang
        from 
          (
            select 
              ku.id_rapbs_periode, 
              0 as volume_rencana, 
              0 as total_rencana, 
              ku.volume as volume_realisasi, 
              ku.saldo as total_realisasi 
            from 
              kas_umum ku 
              join rapbs_periode rp on rp.id_rapbs_periode = ku.id_rapbs_periode 
            where 
              ku.soft_delete = 0 
              and ku.id_anggaran = :idAnggaran 
              and ku.id_ref_bku in (4,24,15,35) 
              and rp.id_periode in (:...listIdPeriode)
              and rp.soft_delete = 0
            UNION ALL 
            select 
              rp.id_rapbs_periode, 
              rp.volume as volume_rencana, 
              rp.jumlah as total_rencana, 
              0 as volume_realisasi, 
              0 as total_realisasi 
            from 
              rapbs r 
              join rapbs_periode rp on rp.id_rapbs = r.id_rapbs 
            where 
              r.id_anggaran = :idAnggaran 
              and rp.id_periode in (:...listIdPeriode)
              and rp.soft_delete = 0 
              and r.soft_delete = 0 
          ) a 
        group by 
          id_rapbs_periode
      ) b;
    `

    const result = await this.rawQuery<
      Array<{ totalPerluDianggarkanUlang: number }>
    >(query, { idAnggaran: idAnggaran, listIdPeriode: listIdPeriode })

    if (result.length > 0) {
      if (result[0].totalPerluDianggarkanUlang !== null) {
        return result[0].totalPerluDianggarkanUlang
      }
    }

    return 0
  }

  async GetListTarikTunaiBKU(
    idAnggaran: string,
    bulan: number
  ): Promise<Array<TarikTunaiBKU>> {
    const paddedMonth = bulan.toString().padStart(2, '0')
    const query = `
    select 
      ku.no_bukti as id, 
      ku.tanggal_transaksi as tanggalTransaksi, 
      a.uraian_kode as kegiatan, 
      ku.uraian as uraian, 
      ku.id_ref_bku as idRefBku,
      rb.bku,
      case 
          when ku.id_ref_bku in (4,24)
          then 'Tunai' 
          when ku.id_ref_bku in (15,35)
          then 'Non Tunai' 
      end as jenisTransaksi,
      (case when ku.volume is not null then ku.volume else 0 end) as jumlahVolume,
      a.jumlah as jumlahAnggaran,
      ku.saldo as saldoDibelanjakan,
      (select sum(saldo) from kas_umum where id_ref_bku in(10,30) and parent_id_kas_umum = ku.id_kas_umum and soft_delete = 0 ) as pajakWajibLapor
    from kas_umum ku
    left join (
        select rp.id_rapbs_periode, rk.id_ref_kode, rk.uraian_kode, rp.jumlah
        from rapbs r
        join rapbs_periode rp
        on rp.id_rapbs = r.id_rapbs
        join ref_kode rk
        on rk.id_ref_kode = r.id_ref_kode
        where r.soft_delete = 0 and rp.soft_delete = 0
    ) a
    on a.id_rapbs_periode = ku.id_rapbs_periode
    left join ref_bku rb
    on ku.id_ref_bku = rb.id_ref_bku
    where ku.id_anggaran = :idAnggaran 
    and ku.id_ref_bku in (3,4,5,23,24,25,15,35) 
    and strftime('%m',tanggal_transaksi) = :bulan
    and ku.soft_delete = 0
    order by ku.tanggal_transaksi asc
    `

    return await this.rawQuery<Array<TarikTunaiBKU>>(query, {
      idAnggaran: idAnggaran,
      bulan: paddedMonth,
    })
  }

  async GetLastTransactionDate(
    idAnggaran: string,
    bulan: number
  ): Promise<Date> {
    const paddedMonth = bulan.toString().padStart(2, '0')

    const res = await this.repo
      .createQueryBuilder()
      .select('MAX(tanggal_transaksi) as tanggalTransaksi')
      .where(`strftime('%m',tanggal_transaksi) = :bulan`, {
        bulan: paddedMonth,
      })
      .andWhere('id_anggaran = :idAnggaran', { idAnggaran })
      .andWhere('soft_delete = 0 ')
      .getRawOne()
    return res.tanggalTransaksi
  }
}
