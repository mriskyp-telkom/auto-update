select 
       ab.saldo_awal_bank||'' as saldo_bos
       ,rp.periode
       ,(select varValue from app_config where varname='tahun_anggaran')tahun_anggaran
       ,rb.saldo_tunai
        
from 
     aktivasi_bku ab 
     join ref_periode rp 
          on ab.id_periode = rp.id_periode          
     join (     
        select id_periode,
        case when id_periode = 1 then 0 
             when id_periode = 2 then ((select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=84) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=84) and id_ref_bku in (8,9))+(select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=81) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=83) and id_ref_bku in (7)))-(select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=81) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=83) and id_ref_bku in (6)) 
             when id_periode = 3 then ((select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=87) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=87) and id_ref_bku in (8,9))+(select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=84) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=86) and id_ref_bku in (7)))-(select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=84) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=86) and id_ref_bku in (6)) 
             when id_periode = 4 then ((select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=90) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=90) and id_ref_bku in (8,9))+(select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=87) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=89) and id_ref_bku in (7)))-(select sum(saldo) as saldo from kas_umum where id_anggaran=:id_anggaran and tanggal_transaksi>=(select tanggal_aktivasi from aktivasi_bku where id_periode=87) and tanggal_transaksi<=(select tanggal_finish from aktivasi_bku where id_periode=89) and id_ref_bku in (6))
        end as saldo_tunai         
        from ref_periode where id_periode<80
     )rb on ab.id_periode = rb.id_periode
where 
      ab.soft_delete = 0
      and ab.id_anggaran=:id_anggaran
      and ab.id_periode=:id_periode 

