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
	date((select max(tanggal_pengesahan) from anggaran where id_anggaran in (:id_anggaran))) as tanggal_pengesahan,
	ifnull(date((select min(tanggal_pengajuan) from anggaran where id_anggaran in (:id_anggaran))),date((select min(create_date) from anggaran where id_anggaran in (:id_anggaran)))) as tanggal_pengajuan,
	(select 
          r.nama_sumber_dana||case when a.is_revisi%100 > 0 then ' Revisi Anggaran Ke '||cast(is_revisi%100 as varchar) else '' end as sumber_dana 
          from anggaran a join ref_sumber_dana r on a.id_ref_sumber_dana = r.id_ref_sumber_dana where id_anggaran=:id_anggaran) as sumber_dana
from 
	mst_sekolah m
	join mst_wilayah w3 
		on m.kode_wilayah = w3.kode_wilayah
	join mst_wilayah w2 
		on w3.mst_kode_wilayah = w2.kode_wilayah
	join mst_wilayah w1 
		on w2.mst_kode_wilayah = w1.kode_wilayah
  join (select ax.sekolah_id,bx.ks,bx.nip_ks,bx.bendahara,bx.nip_bendahara,bx.komite,bx.nip_komite from anggaran ax join sekolah_penjab bx on ax.id_penjab = bx.id_penjab where ax.id_anggaran=:id_anggaran) p  
    on m.sekolah_id = p.sekolah_id
