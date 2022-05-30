select
	(select distinct sekolah_id from anggaran where id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4,:id_anggaran5,:id_anggaran6)) as sekolah_id, 
	m.[npsn] as npsn,
	m.[nama] as nama,
	m.[alamat] as alamat,
	w3.[nama] as kec,
	w2.[nama] as kab, 
	w1.[nama] as prop,
	p.ks as ks,
	p.nip_ks as nip_ks,
	p.bendahara as bendahara,
	p.nip_bendahara as nip_bendahara,
	p.komite as komite,
	p.nip_komite as nip_komite,
	(
		select 
			ifnull((select case when a.is_revisi = (select case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then 1 else 100 end) then r.nama_sumber_dana || ' Perubahan' else case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then r.nama_sumber_dana else case when a.is_revisi in (0,100) then r.nama_sumber_dana else r.nama_sumber_dana||case when (cast(a.is_revisi as integer)/cast(100 as integer)) = 1 then ' Perubahan' else '' end||' Revisi Ke '||cast(a.is_revisi%100 as string) end end end as sumber_dana from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran in (:id_anggaran1)),'')
			||
			ifnull((select ', '||case when a.is_revisi = (select case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then 1 else 100 end) then r.nama_sumber_dana || ' Perubahan' else case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then r.nama_sumber_dana else case when a.is_revisi in (0,100) then r.nama_sumber_dana else r.nama_sumber_dana||case when (cast(a.is_revisi as integer)/cast(100 as integer)) = 1 then ' Perubahan' else '' end||' Revisi Ke '||cast(a.is_revisi%100 as string) end end end as sumber_dana from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran in (:id_anggaran2)),'')
			||
			ifnull((select ', '||case when a.is_revisi = (select case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then 1 else 100 end) then r.nama_sumber_dana || ' Perubahan' else case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then r.nama_sumber_dana else case when a.is_revisi in (0,100) then r.nama_sumber_dana else r.nama_sumber_dana||case when (cast(a.is_revisi as integer)/cast(100 as integer)) = 1 then ' Perubahan' else '' end||' Revisi Ke '||cast(a.is_revisi%100 as string) end end end as sumber_dana from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran in (:id_anggaran3)),'')
			||
			ifnull((select ', '||case when a.is_revisi = (select case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then 1 else 100 end) then r.nama_sumber_dana || ' Perubahan' else case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then r.nama_sumber_dana else case when a.is_revisi in (0,100) then r.nama_sumber_dana else r.nama_sumber_dana||case when (cast(a.is_revisi as integer)/cast(100 as integer)) = 1 then ' Perubahan' else '' end||' Revisi Ke '||cast(a.is_revisi%100 as string) end end end as sumber_dana from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran in (:id_anggaran4)),'')
			||
			ifnull((select ', '||case when a.is_revisi = (select case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then 1 else 100 end) then r.nama_sumber_dana || ' Perubahan' else case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then r.nama_sumber_dana else case when a.is_revisi in (0,100) then r.nama_sumber_dana else r.nama_sumber_dana||case when (cast(a.is_revisi as integer)/cast(100 as integer)) = 1 then ' Perubahan' else '' end||' Revisi Ke '||cast(a.is_revisi%100 as string) end end end as sumber_dana from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran in (:id_anggaran5)),'')
			||
			ifnull((select ', '||case when a.is_revisi = (select case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then 1 else 100 end) then r.nama_sumber_dana || ' Perubahan' else case when (select cast((select varvalue from app_config where varname='tahun_anggaran') as integer) < 2019) then r.nama_sumber_dana else case when a.is_revisi in (0,100) then r.nama_sumber_dana else r.nama_sumber_dana||case when (cast(a.is_revisi as integer)/cast(100 as integer)) = 1 then ' Perubahan' else '' end||' Revisi Ke '||cast(a.is_revisi%100 as string) end end end as sumber_dana from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran in (:id_anggaran6)),'')
	) as sumber_dana
from 
	mst_sekolah m
	join mst_wilayah w3 
		on m.kode_wilayah = w3.kode_wilayah
	join mst_wilayah w2 
		on w3.mst_kode_wilayah = w2.kode_wilayah
	join mst_wilayah w1 
		on w2.mst_kode_wilayah = w1.kode_wilayah
  join (
    select 
      (select distinct sekolah_id from anggaran where id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4,:id_anggaran5,:id_anggaran6)) as sekolah_id
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
          and (:id_periode-80) >= cast(strftime('%m', tanggal_mulai) as int) 
          and (:id_periode-80) <=  cast(strftime('%m', tanggal_selesai) as int)
      )
    ) p  
    on m.sekolah_id = p.sekolah_id
