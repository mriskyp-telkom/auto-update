select 
       ab.saldo_awal_bank,ab.saldo_awal_tunai,ab.saldo_akhir_bank,ab.saldo_akhir_tunai,rp.periode,(select varvalue from app_config where varname='tahun_anggaran')tahun_anggaran,ab.tanggal_aktivasi,ab.tanggal_finish
from 
     aktivasi_bku ab 
     join ref_periode rp 
          on ab.id_periode = rp.id_periode
where 
      ab.soft_delete = 0
      and ab.id_anggaran=:id_anggaran
      and ab.id_periode=:id_periode 

