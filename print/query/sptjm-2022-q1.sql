select 
  (date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end)) as tanggal_aktivasi 
  ,(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end)) as tanggal_finish
  ,'Semester '||cast( :id_periode as varchar) as triwulan
  ,0 as sisa
  ,0 as jumlah
  ,m.[npsn] as npsn
  ,m.[nama] as nama
  ,m.[alamat] as alamat
  ,w3.[nama] as kec
  ,w2.[nama] as kab
  ,w1.[nama] as prop
  ,p.ks as ks
  ,p.nip_ks as nip_ks
  ,p.bendahara as bendahara
  ,p.nip_bendahara as nip_bendahara
  ,p.komite as komite
  ,p.nip_komite as nip_komite
  ,(select 
      r.nama_sumber_dana||case when a.is_revisi%100 > 0 then ' Revisi Anggaran Ke '||cast(is_revisi%100 as varchar) else '' end as sumber_dana 
    from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran=:id_anggaran) as sumber_dana
from 
  anggaran a
  join mst_sekolah m
    on a.sekolah_id = m.sekolah_id                    
  join mst_wilayah w3      
    on m.kode_wilayah = w3.kode_wilayah          
  join mst_wilayah w2     
    on w3.mst_kode_wilayah = w2.kode_wilayah          
  join mst_wilayah w1     
    on w2.mst_kode_wilayah = w1.kode_wilayah  
  join (
    select 
      (select distinct sekolah_id from anggaran where id_anggaran in (:id_anggaran)) as sekolah_id
      ,bx.ks
      ,bx.nip_ks
      ,bx.bendahara
      ,bx.nip_bendahara
      ,bx.komite
      ,bx.nip_komite 
    from 
      sekolah_penjab bx 
    where 
      bx.id_penjab in (
        select 
          id_penjab 
        from 
          sekolah_penjab 
        where 
          soft_delete=0 
          and (case when :id_periode = 1 then 6 else 12 end) >= cast(strftime('%m', tanggal_mulai) as int) 
          and (case when :id_periode = 1 then 6 else 12 end) <=  cast(strftime('%m', tanggal_selesai) as int)
      )
    ) p  
    on m.sekolah_id = p.sekolah_id
where 
  a.soft_delete = 0      
  and a.id_anggaran =:id_anggaran
 