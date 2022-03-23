import { RapbsPeriode } from 'main/repositories/RapbsPeriode'
import {
  Kegiatan,
  RapbsDetail,
  RekeningBelanja,
  UraianBelanja,
  Bulan,
} from 'main/repositories/RapbsPeriodeDetail'
import { getManager, createQueryBuilder, getRepository } from 'typeorm'

export const GetRapbsPeriode = async (
  idRapbs: string
): Promise<RapbsPeriode> => {
  return await getRepository(RapbsPeriode).findOne({ idRapbs: idRapbs })
}

export const AddRapbsPeriode = async (
  rapbsPeriode: RapbsPeriode
): Promise<any> => {
  return await getRepository(RapbsPeriode).upsert(rapbsPeriode, [
    'idRapbsPeriode',
  ])
}

export const DelRapbsPeriode = async (idRapbsPeriode: string): Promise<any> => {
  return await createQueryBuilder()
    .update(RapbsPeriode)
    .set({
      softDelete: 1,
      lastUpdate: new Date(),
    })
    .where('id_rapbs_periode = :idRapbsPeriode', { idRapbsPeriode })
    .execute()
}

export const GetRapbsPeriodeDetail = async (
  id_tahap: number,
  parent_id: string,
  id_anggaran: string
): Promise<Kegiatan[]> => {
  const entityManager = getManager()
  const result = await entityManager
    .query(
      `
      select
      rk1.id_kode parent_kode
      ,rk3.id_kode as urut 
      ,rk3.id_ref_kode level_1_id 
      ,1 as level
      ,rk3.id_kode as kode
      ,rk3.uraian_kode as uraian
      ,'' as volume  
      ,'' as harga_satuan
      ,'' as volume_januari
      ,'' as januari   
      ,'' as volume_februari   
      ,'' as februari   
      ,'' as volume_maret  
      ,'' as maret  
      ,'' as volume_april
      ,'' as april
      ,'' as volume_mei
      ,'' as mei
      ,'' as volume_juni
      ,'' as juni
      ,'' as volume_juli
      ,'' as juli
      ,'' as volume_agustus
      ,'' as agustus
      ,'' as volume_september   
      ,'' as september   
      ,'' as volume_oktober 
      ,'' as oktober 
      ,'' as volume_november   
      ,'' as november   
      ,'' as volume_desember  
      ,'' as desember  
      ,sum(rp.jumlah) as total
    from 
      rapbs r
      join rapbs_periode rp
        on r.id_rapbs = rp.id_rapbs  
      join ref_kode rk3
        on r.id_ref_kode = rk3.id_ref_kode
      join ref_kode rk2
        on rk3.parent_kode = rk2.id_ref_kode
      join ref_kode rk1
        on rk2.parent_kode = rk1.id_ref_kode
    where
      r.id_anggaran=:id_anggaran  
      and case 
        when :id_tahap=0 then rp.id_periode in (1,2,3,4,81,82,83,84,85,86,87,88,89,90,91,92)
        when :id_tahap=1 then rp.id_periode in (81,82,83)
        when :id_tahap=2 then rp.id_periode in (84,85,86,87,88)
        when :id_tahap=3 then rp.id_periode in (89,90,91,92)
      end          
      and rk1.id_ref_kode = :parent_id
      and r.soft_delete=0  
      and rp.soft_delete=0
    group by 
      rk1.id_kode, rk3.id_kode, rk3.uraian_kode
      
    union all
    select 
      rk1.id_kode parent_kode 
      ,rk3.id_kode||r.kode_rekening as urut 
      ,rk3.id_ref_kode level_1_id
      ,2 as level
      ,rr.kode_rekening as kode
      ,rr.rekening as uraian  
      ,'' as volume  
      ,'' as harga_satuan
      ,sum(case when (rp.id_periode = 81) or (rp.id_periode = 1) then rp.jumlah else 0 end) as volume_januari
      ,sum(case when (rp.id_periode = 81) or (rp.id_periode = 1) then rp.jumlah else 0 end) as januari   
      ,sum(case when rp.id_periode = 82 then rp.jumlah else 0 end) as volume_februari   
      ,sum(case when rp.id_periode = 82 then rp.jumlah else 0 end) as februari   
      ,sum(case when rp.id_periode = 83 then rp.jumlah else 0 end) as volume_maret  
      ,sum(case when rp.id_periode = 83 then rp.jumlah else 0 end) as maret  
      ,sum(case when (rp.id_periode = 84) or (rp.id_periode = 2) then rp.jumlah else 0 end) as volume_april
      ,sum(case when (rp.id_periode = 84) or (rp.id_periode = 2) then rp.jumlah else 0 end) as april
      ,sum(case when rp.id_periode = 85 then rp.jumlah else 0 end) as volume_mei
      ,sum(case when rp.id_periode = 85 then rp.jumlah else 0 end) as mei
      ,sum(case when rp.id_periode = 86 then rp.jumlah else 0 end) as volume_juni
      ,sum(case when rp.id_periode = 86 then rp.jumlah else 0 end) as juni
      ,sum(case when (rp.id_periode = 87) or (rp.id_periode = 3) then rp.jumlah else 0 end) as volume_juli
      ,sum(case when (rp.id_periode = 87) or (rp.id_periode = 3) then rp.jumlah else 0 end) as juli
      ,sum(case when rp.id_periode = 88 then rp.jumlah else 0 end) as volume_agustus
      ,sum(case when rp.id_periode = 88 then rp.jumlah else 0 end) as agustus
      ,sum(case when rp.id_periode = 89 then rp.jumlah else 0 end) as volume_september   
      ,sum(case when rp.id_periode = 89 then rp.jumlah else 0 end) as september   
      ,sum(case when (rp.id_periode = 90) or (rp.id_periode = 4) then rp.jumlah else 0 end) as volume_oktober 
      ,sum(case when (rp.id_periode = 90) or (rp.id_periode = 4) then rp.jumlah else 0 end) as oktober 
      ,sum(case when rp.id_periode = 91 then rp.jumlah else 0 end) as volume_november   
      ,sum(case when rp.id_periode = 91 then rp.jumlah else 0 end) as november   
      ,sum(case when rp.id_periode = 92 then rp.jumlah else 0 end) as volume_desember  
      ,sum(case when rp.id_periode = 92 then rp.jumlah else 0 end) as desember  
      ,sum(case 
        when :id_tahap=0 then case when rp.id_periode in (1,2,3,4,81,82,83,84,85,86,87,88,89,90,91,92) then rp.jumlah else 0 end
        when :id_tahap=1 then case when rp.id_periode in (81,82,83) then rp.jumlah else 0 end
        when :id_tahap=2 then case when rp.id_periode in (84,85,86,87,88) then rp.jumlah else 0 end
        when :id_tahap=3 then case when rp.id_periode in (89,90,91,92) then rp.jumlah else 0 end
      end) as total  
    from 
      rapbs r
      join rapbs_periode rp
        on r.id_rapbs = rp.id_rapbs
      join ref_rekening rr
        on r.kode_rekening = rr.kode_rekening
      join ref_kode rk3
        on r.id_ref_kode = rk3.id_ref_kode    
      join ref_kode rk2  
        on rk3.parent_kode = rk2.id_ref_kode    
      join ref_kode rk1  
        on rk2.parent_kode = rk1.id_ref_kode
    where
      r.id_anggaran=:id_anggaran  
      and case 
        when :id_tahap=0 then rp.id_periode in (1,2,3,4,81,82,83,84,85,86,87,88,89,90,91,92)
        when :id_tahap=1 then rp.id_periode in (81,82,83)
        when :id_tahap=2 then rp.id_periode in (84,85,86,87,88)
        when :id_tahap=3 then rp.id_periode in (89,90,91,92)
      end          
      and rk1.id_ref_kode = :parent_id
      and r.soft_delete=0  
      and rp.soft_delete=0
    group by 
      rk3.id_kode,rr.kode_rekening,rr.rekening

    union all
    select 
      rk1.id_kode parent_kode
      ,rk3.id_kode||r.kode_rekening||'.'||r.urutan as urut 
      ,rk3.id_ref_kode level_1_id
      ,3 as level
      ,r.kode_rekening as kode
      ,r.uraian_text as uraian  
      ,sum(rp.volume) as volume     
      ,max(r.harga_satuan) as harga_satuan
      ,sum(case when (rp.id_periode = 81) or (rp.id_periode = 1) then rp.volume else 0 end) as volume_januari   
      ,sum(case when (rp.id_periode = 81) or (rp.id_periode = 1) then rp.jumlah else 0 end) as januari   
      ,sum(case when rp.id_periode = 82 then rp.volume else 0 end) as volume_februari   
      ,sum(case when rp.id_periode = 82 then rp.jumlah else 0 end) as februari   
      ,sum(case when rp.id_periode = 83 then rp.volume else 0 end) as volume_maret  
      ,sum(case when rp.id_periode = 83 then rp.jumlah else 0 end) as maret  
      ,sum(case when (rp.id_periode = 84) or (rp.id_periode = 2) then rp.volume else 0 end) as volume_april
      ,sum(case when (rp.id_periode = 84) or (rp.id_periode = 2) then rp.jumlah else 0 end) as april
      ,sum(case when rp.id_periode = 85 then rp.volume else 0 end) as volume_mei
      ,sum(case when rp.id_periode = 85 then rp.jumlah else 0 end) as mei
      ,sum(case when rp.id_periode = 86 then rp.volume else 0 end) as volume_juni
      ,sum(case when rp.id_periode = 86 then rp.jumlah else 0 end) as juni
      ,sum(case when (rp.id_periode = 87) or (rp.id_periode = 3) then rp.volume else 0 end) as volume_juli
      ,sum(case when (rp.id_periode = 87) or (rp.id_periode = 3) then rp.jumlah else 0 end) as juli
      ,sum(case when rp.id_periode = 88 then rp.volume else 0 end) as volume_agustus
      ,sum(case when rp.id_periode = 88 then rp.jumlah else 0 end) as agustus
      ,sum(case when rp.id_periode = 89 then rp.volume else 0 end) as volume_september   
      ,sum(case when rp.id_periode = 89 then rp.jumlah else 0 end) as september   
      ,sum(case when (rp.id_periode = 90) or (rp.id_periode = 4) then rp.volume else 0 end) as volume_oktober 
      ,sum(case when (rp.id_periode = 90) or (rp.id_periode = 4) then rp.jumlah else 0 end) as oktober 
      ,sum(case when rp.id_periode = 91 then rp.volume else 0 end) as volume_november   
      ,sum(case when rp.id_periode = 91 then rp.jumlah else 0 end) as november   
      ,sum(case when rp.id_periode = 92 then rp.volume else 0 end) as volume_desember  
      ,sum(case when rp.id_periode = 92 then rp.jumlah else 0 end) as desember  
      ,sum(case 
        when :id_tahap=0 then case when rp.id_periode in (1,2,3,4,81,82,83,84,85,86,87,88,89,90,91,92) then rp.jumlah else 0 end
        when :id_tahap=1 then case when rp.id_periode in (81,82,83) then rp.jumlah else 0 end
        when :id_tahap=2 then case when rp.id_periode in (84,85,86,87,88) then rp.jumlah else 0 end
        when :id_tahap=3 then case when rp.id_periode in (89,90,91,92) then rp.jumlah else 0 end
      end) as total  
    from 
      rapbs r
      join rapbs_periode rp
        on r.id_rapbs = rp.id_rapbs
      join ref_kode rk3
        on r.id_ref_kode = rk3.id_ref_kode
      join ref_kode rk2
        on rk3.parent_kode = rk2.id_ref_kode
      join ref_kode rk1
        on rk2.parent_kode = rk1.id_ref_kode
    where
      r.id_anggaran=:id_anggaran  
      and case 
        when :id_tahap=0 then rp.id_periode in (1,2,3,4,81,82,83,84,85,86,87,88,89,90,91,92)
        when :id_tahap=1 then rp.id_periode in (81,82,83)
        when :id_tahap=2 then rp.id_periode in (84,85,86,87,88)
        when :id_tahap=3 then rp.id_periode in (89,90,91,92)
      end            
      and rk1.id_ref_kode = :parent_id
      and r.soft_delete=0  
      and rp.soft_delete=0
    group by 
      r.id_rapbs,rk3.id_kode,r.kode_rekening,r.uraian_text,r.urutan
    order by urut, level;
    `,
      [{ id_tahap: id_tahap, id_anggaran: id_anggaran, parent_id: parent_id }]
    )
    .catch((e) => {
      console.log('error happen during query %s', e)
    })

  const rows = <RapbsDetail[]>result
  const mapKegiatan: { [key: string]: Kegiatan } = {}
  const mapRekeningBelanja: { [key: string]: RekeningBelanja } = {}

  rows.forEach((row) => {
    if (row.level == 1) {
      const k = {} as Kegiatan
      k.kode = row.kode
      k.label = row.uraian
      k.total = row.total
      k.rekening_belanja = []

      mapKegiatan[row.level_1_id] = k
    }

    if (row.level == 2) {
      const rb = {} as RekeningBelanja
      rb.parent_id = row.level_1_id
      rb.kode = row.kode
      rb.label = row.uraian
      rb.total = row.total
      rb.uraian = []

      mapRekeningBelanja[row.level_1_id + row.kode] = rb
    }

    if (row.level == 3) {
      const uraian = mapRekeningBelanja[row.level_1_id + row.kode].uraian
      const belanja = {} as UraianBelanja
      belanja.label = row.uraian
      belanja.volume = row.volume
      belanja.harga_satuan = row.harga_satuan

      const belanja_bulanan: Bulan = {
        januari: { volume: row.volume_januari, total: row.januari },
        februari: { volume: row.volume_februari, total: row.februari },
        maret: { volume: row.volume_maret, total: row.maret },
        april: { volume: row.volume_april, total: row.april },
        mei: { volume: row.volume_mei, total: row.mei },
        juni: { volume: row.volume_juni, total: row.juni },
        juli: { volume: row.volume_juli, total: row.juli },
        agustus: { volume: row.volume_agustus, total: row.agustus },
        september: { volume: row.volume_september, total: row.september },
        oktober: { volume: row.volume_oktober, total: row.oktober },
        november: { volume: row.volume_november, total: row.november },
        desember: { volume: row.volume_desember, total: row.desember },
      }

      belanja.bulan = belanja_bulanan

      uraian.push(belanja)
      mapRekeningBelanja[row.level_1_id + row.kode].uraian = uraian
    }
  })

  const kegiatan: Kegiatan[] = []
  Object.keys(mapRekeningBelanja).map((key) => {
    const k = mapRekeningBelanja[key]
    mapKegiatan[k.parent_id].rekening_belanja.push(k)
  })

  Object.keys(mapKegiatan).map((key) => {
    const k = mapKegiatan[key]
    kegiatan.push(k)
  })

  return kegiatan
}
