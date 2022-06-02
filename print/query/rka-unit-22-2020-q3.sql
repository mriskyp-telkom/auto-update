	select 
		r.id_anggaran
		,r.kode_rekening as kode_rekening
 		,substr(rk3.id_kode,1,3) as kd_prog
 		,substr(rk3.id_kode,4,3) as kd_sub
 		,substr(rk3.id_kode,7,3) as kd_keg
 		,rk3.id_kode  as id_kode
 		,rk3.uraian_kode as uraian_kode
 		,null as nama_sekolah 
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.1' then r.jumlah else 0 end) as belanja1
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.2' then r.jumlah else 0 end) as belanja2
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.3' then r.jumlah else 0 end) as belanja3
		,sum(r.jumlah) as jumlah
		,1 as color_id
	from 
		(select id_anggaran,id_ref_kode,kode_rekening,sum(jumlah) as jumlah from rapbs where soft_delete = 0 and id_anggaran=:id_anggaran group by id_anggaran,id_ref_kode,kode_rekening) r
		join ref_rekening rr on r.[kode_rekening] = rr.kode_rekening
		join ref_kode rk on r.id_ref_kode = rk.id_ref_kode
		join ref_kode rk2 on rk.parent_kode = rk2.id_ref_kode
    join ref_kode rk3 on rk2.parent_kode = rk3.id_ref_kode
	group by r.id_anggaran,rk3.id_kode,rk3.uraian_kode

	union

	select 
		r.id_anggaran
		,r.kode_rekening as kode_rekening
 		,substr(rk2.id_kode,1,3) as kd_prog
 		,substr(rk2.id_kode,4,3) as kd_sub
 		,substr(rk2.id_kode,7,3) as kd_keg
 		,rk2.id_kode  as id_kode
 		,rk2.uraian_kode  as uraian_kode
 		,null as nama_sekolah 
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.1' then r.jumlah else 0 end) as belanja1
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.2' then r.jumlah else 0 end) as belanja2
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.3' then r.jumlah else 0 end) as belanja3
		,sum(r.jumlah) as jumlah
		,2 as color_id
	from 
		(select id_anggaran,id_ref_kode,kode_rekening,sum(jumlah) as jumlah from rapbs where soft_delete = 0 and id_anggaran=:id_anggaran group by id_anggaran,id_ref_kode,kode_rekening) r
		join ref_rekening rr on r.[kode_rekening] = rr.kode_rekening
		join ref_kode rk on r.id_ref_kode = rk.id_ref_kode
		join ref_kode rk2 on rk.parent_kode = rk2.id_ref_kode
	group by r.id_anggaran,rk2.id_kode,rk2.uraian_kode

	union
	
	select 
		r.id_anggaran
		,r.kode_rekening as kode_rekening
 		,substr(rk.id_kode,1,3) as kd_prog
 		,substr(rk.id_kode,4,3) as kd_sub
 		,substr(rk.id_kode,7,3) as kd_keg
 		,rk.id_kode  as id_kode
 		,rk.uraian_kode as uraian_kode
 		,s.nama as nama_sekolah 
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.1' then r.jumlah else 0 end) as belanja1
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.2' then r.jumlah else 0 end) as belanja2
		,sum(case when substr(rr.kode_rekening,1,5) = '5.2.3' then r.jumlah else 0 end) as belanja3
		,sum(r.jumlah) as jumlah
		,3 as color_id
	from 
		(select id_anggaran,id_ref_kode,kode_rekening,sum(jumlah) as jumlah from rapbs where soft_delete = 0 and id_anggaran=:id_anggaran group by id_anggaran,id_ref_kode,kode_rekening) r
		join ref_rekening rr on r.[kode_rekening] = rr.kode_rekening
		join ref_kode rk on r.id_ref_kode = rk.id_ref_kode
		join anggaran a on r.id_anggaran = a.id_anggaran
		join mst_sekolah s on a.sekolah_id = s.sekolah_id
	group by r.id_anggaran,rk.id_kode,rk.uraian_kode,s.nama


