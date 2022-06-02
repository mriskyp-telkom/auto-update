select 
       k.tanggal_transaksi
       ,substr(rk.id_kode,1,3) as kd_pro
       ,substr(rk.id_kode,4,3) as kd_sub
       ,substr(rk.id_kode,7,3) as kd_keg
       ,k.kode_rekening       
       ,k.no_bukti
       ,k.uraian
       ,k.debit
       ,k.credit
       ,k.balance
from 
     (
     select 
       tanggal_transaksi     
       ,id_rapbs_periode            
       ,id_anggaran
       ,kode_rekening
       ,uraian       
       ,no_bukti
       ,case when id_ref_bku in (2,5,6,8) then saldo else 0 end as debit
       ,case when id_ref_bku in (3,7,14,15) then saldo else 0 end as credit
       ,(select SUM(case when id_ref_bku in (2,5,6,8) then saldo else 0 end)-SUM(case when id_ref_bku in (3,7,14,15) then saldo else 0 end) from kas_umum as a where id_anggaran=:id_anggaran and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and soft_delete=0 and a.tanggal_transaksi<=b.tanggal_transaksi and a.create_date<=b.create_date and a.rowid<=b.rowid )+0.0 as balance
     from kas_umum as b 
     where soft_delete = 0 and id_anggaran=:id_anggaran and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
     and id_ref_bku in (2,3,5,6,7,8,14,15) 
     order by tanggal_transaksi,create_date     
     )k     
     left join (select * from rapbs_periode where soft_delete = 0) rp on k.id_rapbs_periode = rp.id_rapbs_periode     
     left join (select * from rapbs where soft_delete = 0) r on rp.id_rapbs = r.id_rapbs
	 left join ref_kode rk on r.id_ref_kode = rk.id_ref_kode
	 