select
  p.sekolah_id as sekolah_id, 
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
	:id_periode as periode,
	2022 as tahun_anggaran
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
      bx.sekolah_id as sekolah_id
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
          and :id_periode >= cast(strftime('%m', tanggal_mulai) as int) 
          and :id_periode <=  cast(strftime('%m', tanggal_selesai) as int)
      )
    ) p  
    on m.sekolah_id = p.sekolah_id
