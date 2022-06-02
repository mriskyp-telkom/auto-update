select 
       k.tanggal_transaksi as tanggal_transaksi
       ,k.no_bukti as no_bukti       
       ,k.uraian as uraian
       ,k.realisasi as realisasi
       ,k.balance as jumlah       
       ,(select sum(saldo) as saldo from kas_umum as b 
            where soft_delete = 0 and id_anggaran=:id_anggaran and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
            and id_ref_bku in (2,8,9,28,29)) - k.balance as sisa_anggaran 

from 
     (
     select 
       tanggal_transaksi     
       ,id_rapbs_periode            
       ,id_anggaran
       ,kode_rekening
       ,uraian       
       ,no_bukti
       ,case when id_ref_bku in (4,15,24,35) then saldo else 0 end as realisasi
       ,(select SUM(case when id_ref_bku in (4,15,24,35) then saldo else 0 end) from kas_umum as a where id_anggaran=:id_anggaran and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and soft_delete=0 and a.rowid<=b.rowid )+0.0 as balance
     from kas_umum as b 
     where soft_delete = 0 and id_anggaran=:id_anggaran and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
     and id_ref_bku in (4,15,24,35) 
     order by tanggal_transaksi,create_date     
     )k     
	  
