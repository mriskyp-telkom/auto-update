select 
	0 as saldo_awal
	,ifnull(
		(select 
			sum(saldo)saldo 
		from 
			kas_umum 
		where 
			id_ref_bku=2 
			and soft_delete=0 
			and id_anggaran=:id_anggaran 
			and substr(replace(uraian,'Terima dana BOS ',''),7,1)='1'
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
		)
	,0) as tahap_1

	,ifnull(
		(select 
			sum(saldo)saldo 
		from 
			kas_umum 
		where 
			id_ref_bku=2 
			and soft_delete=0 
			and id_anggaran=:id_anggaran 
			and substr(replace(uraian,'Terima dana BOS ',''),7,1)='2'
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
		)
	,0) as tahap_2

	,ifnull(
		(select 
			sum(saldo)saldo 
		from 
			kas_umum 
		where 
			id_ref_bku=2 
			and soft_delete=0 
			and id_anggaran=:id_anggaran 
			and substr(replace(uraian,'Terima dana BOS ',''),7,1)='3'
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
		)
	,0) as tahap_3

	,ifnull(
		(select 
			sum(k.saldo) 
		from 
			kas_umum k 
			join rapbs_periode rp 
				on k.id_rapbs_periode = rp.id_rapbs_periode 
			join rapbs	r 
				on rp.id_rapbs = r.id_rapbs 
		where 
			k.soft_delete = 0 
			and rp.soft_delete = 0 
			and r.soft_delete = 0 
			and k.id_anggaran=:id_anggaran 
			and k.id_ref_bku in (4,15) 
			and substr(r.kode_rekening,1,3)='5.1'
			--and k.tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and k.tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
		)
	,0) as belanja_51   

	,ifnull(
		(select 
			sum(k.saldo) 
		from 
			kas_umum k 
			join rapbs_periode rp 
				on k.id_rapbs_periode = rp.id_rapbs_periode 
			join rapbs	r 
				on rp.id_rapbs = r.id_rapbs 
		where 
			k.soft_delete = 0 
			and rp.soft_delete = 0 
			and r.soft_delete = 0 
			and k.id_anggaran=:id_anggaran 
			and k.id_ref_bku in (4,15) 
			and substr(r.kode_rekening,1,3)='5.2'
			--and k.tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and k.tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
		)
	,0) as belanja_52
	,(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			kas_umum 
		where 
			id_anggaran=:id_anggaran 
			and soft_delete=0 
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
			and id_ref_bku in (2,5,6)
	) - 
	(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			kas_umum 
		where 
			id_anggaran=:id_anggaran 
			and soft_delete=0 
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
			and id_ref_bku in (3,7,14,15)
	) as sisa_bank
	,(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			kas_umum 
		where 
			id_anggaran=:id_anggaran 
			and soft_delete=0 
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
			and id_ref_bku in (3)
	) -
	(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			kas_umum 
		where 
			id_anggaran=:id_anggaran 
			and soft_delete=0 
			--and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
			and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
			and id_ref_bku in (4,5)
	) as sisa_tunai

