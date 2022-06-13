import { Rapbs } from 'main/models/Rapbs'
import { Connection, SelectQueryBuilder } from 'typeorm'

export class KegiatanBuilder extends SelectQueryBuilder<Rapbs> {
  protected conn: Connection
  constructor(conn: Connection) {
    super(conn)
    this.conn = conn
  }

  private aliasRefKodeLv3 = 'rk'
  private aliasRefKodeLv2 = 'rk2'
  private aliasRefKodeLv1 = 'rk3'

  private anggaranTable = 'anggaran'
  private aliasAnggaran = 'a'

  private refRekeningTable = 'ref_rekening'
  private aliasRekeningTable = 'rr'

  private refKodeTable = 'ref_kode'
  private aliasRefKodeJoin = 'r'

  private refSatuanTable = 'ref_satuan'
  private aliasrefSatuan = 'rs'

  private rapbsPeriodeTable = 'rapbs_periode'
  private aliasRapbsPeriode = 'rp'

  fromRapbs() {
    this.from(Rapbs, 'r')
    return this
  }

  joinRefKodeAndParents() {
    this.innerJoin(
      this.refKodeTable,
      this.aliasRefKodeLv3,
      `${this.aliasRefKodeJoin}.id_ref_kode = rk.id_ref_kode`
    )
      .innerJoin(
        this.refKodeTable,
        this.aliasRefKodeLv2,
        'rk.parent_kode = rk2.id_ref_kode'
      )
      .innerJoin(
        this.refKodeTable,
        this.aliasRefKodeLv1,
        'rk2.parent_kode = rk3.id_ref_kode'
      )

    return this
  }

  joinRapbsPeriode() {
    this.innerJoin(
      this.rapbsPeriodeTable,
      this.aliasRapbsPeriode,
      'r.id_rapbs = rp.id_rapbs'
    )
    return this
  }

  joinAnggaran() {
    this.innerJoin(
      this.anggaranTable,
      this.aliasAnggaran,
      'r.id_anggaran = a.id_anggaran'
    )
    return this
  }

  joinRekening() {
    this.innerJoin(
      this.refRekeningTable,
      this.aliasRekeningTable,
      'r.kode_rekening = rr.kode_rekening'
    )
    return this
  }

  joinSatuan() {
    this.leftJoin(
      this.refSatuanTable,
      this.aliasrefSatuan,
      'rp.satuan = rs.satuan'
    )
    return this
  }

  BuildUraianKegiatan() {
    return this.fromRapbs()
      .joinRefKodeAndParents()
      .joinRapbsPeriode()
      .joinRekening()
      .joinSatuan()
  }

  BuildListKegiatan() {
    return this.fromRapbs().joinRefKodeAndParents().joinRapbsPeriode()
  }
}
