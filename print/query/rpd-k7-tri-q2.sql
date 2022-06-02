select urut,no_urut,varName,varValue_bos,varValue_bosda,varValue_lainnya,varValue_bos+varValue_bosda+varValue_lainnya as varValue from 
(
	  select 1 as urut, 'A' as no_urut, 'PENDAPATAN DANA' as varName, null as varValue_bos, null as varValue_bosda, null as varValue_lainnya
	union 
	  select 2 as urut, null as no_urut, '' as varName, null as varValue_bos, null as varValue_bosda, null as varValue_lainnya
	union 
		select 
			3 as urut, 1 as no_urut
			, '    Saldo BKU' as varName
			, sum(case when a.id_ref_sumber_dana = 1 then saldo_awal_bank+saldo_awal_tunai+saldo_awal_bank_sisa+saldo_awal_tunai_sisa else 0 end) as varValue_bos
			, sum(case when a.id_ref_sumber_dana in (2,3) then saldo_awal_bank+saldo_awal_tunai+saldo_awal_bank_sisa+saldo_awal_tunai_sisa else 0 end) as varValue_bosda 
			, sum(case when a.id_ref_sumber_dana in (4,5) then saldo_awal_bank+saldo_awal_tunai+saldo_awal_bank_sisa+saldo_awal_tunai_sisa else 0 end) as varValue_lainnya
		from 
			 aktivasi_bku v     
			 join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a     
				  on v.id_anggaran = a.id_anggaran
		where 
			  v.tanggal_aktivasi=:tanggal_start 
		group by 
			  v.id_periode
	union
	  select 4 as urut, 2 as no_urut, '    Pendapatan rutin' as varName, 0 as varValue_bos, 0 as varValue_bosda, 0 as varValue_lainnya
	union
		select 
			5 as urut, 3 as no_urut
			, '    Bantuan Operasional Sekolah' as varName
			,sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) varValue_bos     
			,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) varValue_bosda 
			,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) varValue_lainnya     
		from 
			 kas_umum k     
			 join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a     
				  on k.id_anggaran = a.id_anggaran
		where 
			  id_ref_bku in (2) 
			  and tanggal_transaksi between :tanggal_start and :tanggal_end
	union 
	  select 6 as urut, 4 as no_urut, '    Bantuan lain' as varName, 0 as varValue_bos, 0 as varValue_bosda, 0 as varValue_lainnya
	union
		select 
			7 as urut, 5 as no_urut
			, '    Sumber Pendapatan lainnya( bunga Bank)' as varName
			,sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) varValue_bos     
			,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) varValue_bosda 
			,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) varValue_lainnya     
		from 
			 kas_umum k     
			 join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a     
				  on k.id_anggaran = a.id_anggaran
		where 
			  id_ref_bku in (6,26) 
			  and tanggal_transaksi between :tanggal_start and :tanggal_end
	union 
	  select 8 as urut, null as no_urut, '' as varName, null as varValue_bos, null as varValue_bosda, null as varValue_lainnya
	union 
	  select 9 as urut, null as no_urut, '    Total Penerimaan Dana' as varName, sum(d_varValue_bos) as varValue_bos, sum(d_varValue_bosda) as varValue_bosda, sum(d_varValue_lainnya) as varValue_lainnya  
	  from (  
		select 
			sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) as d_varValue_bos 
		  , sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) as d_varValue_bosda 
		  , sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) as d_varValue_lainnya
		from 
		  kas_umum k 
		  join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a 
			on k.id_anggaran = a.id_anggaran 
		where 
		  k.id_ref_bku = 2 
		  and k.tanggal_transaksi between :tanggal_start and :tanggal_end
		  and :id_anggaran=:id_anggaran 
		group by k.id_ref_bku      
		union
		select 
			  sum(case when a.id_ref_sumber_dana = 1 then saldo_awal_bank+saldo_awal_tunai+saldo_awal_bank_sisa+saldo_awal_tunai_sisa else 0 end) as d_varValue_bos
			  , sum(case when a.id_ref_sumber_dana in (2,3) then saldo_awal_bank+saldo_awal_tunai+saldo_awal_bank_sisa+saldo_awal_tunai_sisa else 0 end) as d_varValue_bosda 
			, sum(case when a.id_ref_sumber_dana in (4,5) then saldo_awal_bank+saldo_awal_tunai+saldo_awal_bank_sisa+saldo_awal_tunai_sisa else 0 end) as d_varValue_lainnya
		from 
			   aktivasi_bku v     
			   join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a     
				  on v.id_anggaran = a.id_anggaran
		where 
				v.tanggal_aktivasi=:tanggal_start 
		  group by 
			  v.id_periode
		union
		  select 
			 sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) d_varValue_bos     
			,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) d_varValue_bosda 
			,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) d_varValue_lainnya     
		  from 
			  kas_umum k     
				join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a     
					on k.id_anggaran = a.id_anggaran
			where 
				id_ref_bku in (6,26) 
				and tanggal_transaksi between :tanggal_start and :tanggal_end
	  )y
	union 
	  select 10 as urut, 'B' as no_urut, 'PENGGUNAAN DANA' as varName, null as varValue_bos, null as varValue_bosda, null as varValue_lainnya
)
order by urut

