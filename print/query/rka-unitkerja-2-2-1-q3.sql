select 
       ri.id_ref_indikator
       ,ri.nama_indikator
       ,case when ri.id_ref_indikator = 2 then 'Dana' else i.tolak_ukur end as tolak_ukur
       ,case when ri.id_ref_indikator = 2 then 
             (select ifnull(sum(r.jumlah),0)  
               from rapbs r
               join ref_rekening rr on r.kode_rekening = rr.kode_rekening
               where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0 
             )
        else i.target_kinerja end as target_kinerja
from 
     ref_indikator ri     
     left join (select i2.id_ref_indikator,i2.tolak_ukur,i2.capaian as target_kinerja from anggaran a join rencana_kerja_anggaran rka on a.id_anggaran = rka.id_anggaran join indikator i2 on rka.id_rka = i2.id_rka
          where a.sekolah_id=:sekolah_id and a.id_anggaran=:id_anggaran and a.soft_delete=0 and rka.soft_delete=0 and i2.soft_delete=0) i          
          on ri.id_ref_indikator = i.id_ref_indikator
where ri.expired_date is null



