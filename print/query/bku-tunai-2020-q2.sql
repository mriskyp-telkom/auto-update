select 
	k.tanggal_transaksi as tanggal_transaksi
	,substr(rk.id_kode,1,3) as kd_pro
	,substr(rk.id_kode,4,3) as kd_sub
	,substr(rk.id_kode,7,3) as kd_keg
	,k.kode_rekening as kode_rekening
	,k.no_bukti as no_bukti
	,k.uraian as uraian
	,k.debit as debit
	,k.credit as credit
	,k.balance as balance
from 
	(
		select 
			tanggal_transaksi     
			,id_rapbs_periode            
			,id_anggaran
			,kode_rekening
			,uraian       
			,no_bukti
			,case when id_ref_bku in (3,9,23,29) then saldo else 0 end as debit
			,case when id_ref_bku in (4,5,24,25) then saldo else 0 end as credit
			,(
				select 
					SUM(case when id_ref_bku in (3,9,23,29) then saldo else 0 end)
					-SUM(case when id_ref_bku in (4,5,24,25) then saldo else 0 end) 
				from 
					rpt_bku as a
				where 
					a.rowid<=b.rowid 
			)+0.0 as balance
		from 
			rpt_bku as b 
		where 
			id_ref_bku in (3,9,23,29,4,5,24,25) 
			and id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4,:id_anggaran5,:id_anggaran6)
			and :id_periode=:id_periode
		order by 
			tanggal_transaksi,create_date     
	)k     
	left join (select * from rapbs_periode where soft_delete = 0) rp on k.id_rapbs_periode = rp.id_rapbs_periode     
	left join (select * from rapbs where soft_delete = 0) r on rp.id_rapbs = r.id_rapbs
	left join ref_kode rk on r.id_ref_kode = rk.id_ref_kode
	 	 