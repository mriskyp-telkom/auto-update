select
  (select distinct sekolah_id from anggaran where id_anggaran in (:id_anggaran)) as sekolah_id, 
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
	(select 
          r.nama_sumber_dana||case when a.is_revisi%100 > 0 then ' Revisi Anggaran Ke '||cast(is_revisi%100 as varchar) else '' end as sumber_dana 
          from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran=:id_anggaran) as sumber_dana,          
  (select sum(saldo) as saldo from kas_umum as b 
     where soft_delete = 0 and id_anggaran=:id_anggaran and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
     and id_ref_bku in (2,8,9,28,29) 
  ) saldo_sebelum
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
          and (:id_periode-80) >= cast(strftime('%m', tanggal_mulai) as int) 
          and (:id_periode-80) <=  cast(strftime('%m', tanggal_selesai) as int)
      )
    ) p  
    on m.sekolah_id = p.sekolah_id
