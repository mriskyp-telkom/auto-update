select 
	periode
	,sum(ifnull(saldo_awal_bank,0))+sum(ifnull(saldo_awal_bank_sisa,0)) as saldo_awal_bank
	,sum(ifnull(saldo_awal_tunai,0))+sum(ifnull(saldo_awal_tunai_sisa,0)) as saldo_awal_tunai
	,sum(ifnull(saldo_akhir_bank,0))+sum(ifnull(saldo_akhir_bank_sisa,0)) as saldo_akhir_bank
	,sum(ifnull(saldo_akhir_tunai,0))+sum(ifnull(saldo_akhir_tunai_sisa,0)) as saldo_akhir_tunai
	,(select varValue from app_config where varname='tahun_anggaran')tahun_anggaran
	,(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			rpt_bku
		where 
			id_ref_bku in (8,2,5,6,25,28,26)
	) - 
	(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			rpt_bku
		where 
			id_ref_bku in (3,7,14,15,23,27,35)
	) as sisa_bank,
	(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			rpt_bku 
		where 
			id_ref_bku in (3,9,23,29)
	) - 
	(
		select 
			ifnull(sum(saldo),0)saldo 
		from 
			rpt_bku 
		where 
			id_ref_bku in (4,24,5,25)
	) as sisa_tunai
	,min(tanggal_aktivasi) as tanggal_aktivasi
	,max(tanggal_finish) as tanggal_finish
from 
(
	select 
		ab.saldo_awal_bank
		,ab.saldo_awal_tunai
		,ab.saldo_awal_bank_sisa
		,ab.saldo_awal_tunai_sisa
		,ab.saldo_akhir_bank
		,ab.saldo_akhir_tunai
		,ab.saldo_akhir_bank_sisa
		,ab.saldo_akhir_tunai_sisa
		,rp.periode
		,ab.tanggal_aktivasi
		,ab.tanggal_finish
	from 
		aktivasi_bku ab
		join ref_periode rp 
			on ab.id_periode = rp.id_periode
	where 
		ab.soft_delete = 0
		and ab.id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4,:id_anggaran5,:id_anggaran6)
		and ab.id_periode=:id_periode 
)x
group by x.periode		  

