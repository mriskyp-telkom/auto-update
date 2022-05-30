select 
       ab.saldo_awal_bank,ab.saldo_awal_tunai,ab.saldo_akhir_bank,ab.saldo_akhir_tunai,rp.periode,(select varValue from app_config where varname='tahun_anggaran')tahun_anggaran
,
(select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:id_anggaran and soft_delete=0 and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <= (select tanggal_finish from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and id_ref_bku in (8,2,5,6)) - 
(select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:id_anggaran and soft_delete=0 and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <= (select tanggal_finish from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and id_ref_bku in (3,7,14,15)) as sisa_bank,
(select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:id_anggaran and soft_delete=0 and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <= (select tanggal_finish from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and id_ref_bku in (3,9)) - 
(select ifnull(sum(saldo),0)saldo from kas_umum where id_anggaran=:id_anggaran and soft_delete=0 and tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and tanggal_transaksi <= (select tanggal_finish from aktivasi_bku where soft_delete = 0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and id_ref_bku in (4,5)) as sisa_tunai
,ab.tanggal_aktivasi,ab.tanggal_finish
from 
     aktivasi_bku ab 
     join ref_periode rp 
          on ab.id_periode = rp.id_periode
where 
      ab.soft_delete = 0
      and ab.id_anggaran=:id_anggaran
      and ab.id_periode=:id_periode 

