select 
	rx.id_kode
	,rx.uraian_kode as uraian_kode
	,rx2.v1
	,rx2.v2
	,rx2.v3
	,rx2.v4
	,rx2.v5
	,rx2.v6
	,rx2.v7
	,rx2.v8
	,rx2.v9
	,rx2.v10
	,rx2.v11
	,rx2.v12 
FROM 
	ref_kode rx 
	JOIN 
	(
		SELECT 
			x.id_ref_kode
			,sum(v1)v1
			,sum(v2)v2
			,sum(v3)v3
			,sum(v4)v4
			,sum(v5)v5
			,sum(v6)v6
			,sum(v7)v7
			,sum(v8)v8
			,sum(v9)v9
			,sum(v10)v10
			,sum(v11)v11
			,sum(v12)v12
		from 
		(
			select 
				r.id_ref_kode
				,case when substr(r2.id_kode,4,2) = '01' then sum(ifnull(k3.jumlah,0)) else 0 end as v1
				,case when substr(r2.id_kode,4,2) = '02' then sum(ifnull(k3.jumlah,0)) else 0 end as v2
				,case when substr(r2.id_kode,4,2) = '03' then sum(ifnull(k3.jumlah,0)) else 0 end as v3
				,case when substr(r2.id_kode,4,2) = '04' then sum(ifnull(k3.jumlah,0)) else 0 end as v4
				,case when substr(r2.id_kode,4,2) = '05' then sum(ifnull(k3.jumlah,0)) else 0 end as v5
				,case when substr(r2.id_kode,4,2) = '06' then sum(ifnull(k3.jumlah,0)) else 0 end as v6
				,case when substr(r2.id_kode,4,2) = '07' then sum(ifnull(k3.jumlah,0)) else 0 end as v7
				,case when substr(r2.id_kode,4,2) = '08' then sum(ifnull(k3.jumlah,0)) else 0 end as v8
				,case when substr(r2.id_kode,4,2) = '09' then sum(ifnull(k3.jumlah,0)) else 0 end as v9
				,case when substr(r2.id_kode,4,2) = '10' then sum(ifnull(k3.jumlah,0)) else 0 end as v10
				,case when substr(r2.id_kode,4,2) = '11' then sum(ifnull(k3.jumlah,0)) else 0 end as v11
				,case when substr(r2.id_kode,4,2) = '12' then sum(ifnull(k3.jumlah,0)) else 0 end as v12
			from 
				ref_kode r
				join ref_kode r2 on r2.parent_kode = r.id_ref_kode
				LEFT join (    
					SELECT 
						r2.id_ref_kode
						,sum(k2.jum) as jumlah
					from 
						ref_kode r
						join ref_kode r2 on r.parent_kode = r2.id_ref_kode     
						join (
							SELECT 
								r.id_ref_kode     
								,sum(k.saldo) as jum
							from 
								kas_umum k 
								join rapbs_periode rp 
									ON k.id_rapbs_periode = rp.id_rapbs_periode     
								join rapbs r 
									ON rp.id_rapbs = r.id_rapbs
							where
								k.soft_delete =  0     
								and rp.soft_delete = 0     
								and r.soft_delete = 0 
								and k.id_anggaran=:id_anggaran 
								 and k.tanggal_transaksi >= (date(
									case 
										when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' 
										when :id_periode = 2 then (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' 
										when :id_periode = 11 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' 
										when :id_periode = 12 then (select varvalue from app_config where varname='tahun_anggaran')||'-04-01' 
										when :id_periode = 13 then (select varvalue from app_config where varname='tahun_anggaran')||'-09-01' 
									end))
								 and k.tanggal_transaksi <= (date(
									case 
										when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' 
										when :id_periode = 2 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
										when :id_periode = 11 then (select varvalue from app_config where varname='tahun_anggaran')||'-03-31' 
										when :id_periode = 12 then (select varvalue from app_config where varname='tahun_anggaran')||'-08-31' 
										when :id_periode = 13 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
									end)) 
								 and case when (select id_ref_sumber_dana from anggaran where id_anggaran=:id_anggaran) < 30 then k.id_ref_bku in (4,15) else k.id_ref_bku in (24,35) end 
							group by 
								r.id_ref_kode    
						)k2 
							on r.id_ref_kode = k2.id_ref_kode     
					where 
						r.bentuk_pendidikan_id = (select dm.bentuk_pendidikan_id as bentuk_pendidikan_id from anggaran da join mst_sekolah dm on da.sekolah_id = dm.sekolah_id where da.id_anggaran=:id_anggaran)
					group by r2.id_ref_kode
				)k3 
					on r2.id_ref_kode = k3.id_ref_kode
			where 
				r.expired_date is null 
				and r2.expired_date is null 
				and r.id_level_kode=1 
				and r.bentuk_pendidikan_id = (select dm.bentuk_pendidikan_id as bentuk_pendidikan_id from anggaran da join mst_sekolah dm on da.sekolah_id = dm.sekolah_id where da.id_anggaran=:id_anggaran)
			group by 
				r.id_ref_kode
				,r2.id_kode
			--order by id_kode
		)x
		group by x.id_ref_kode
	)rx2 
		on rx.id_ref_kode = rx2.id_ref_kode
order by rx.id_kode
