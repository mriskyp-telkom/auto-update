select 
       case 
       when ab.id_periode=1 then (select tanggal_aktivasi from aktivasi_bku where id_periode=81) 
       when ab.id_periode=2 then (select tanggal_aktivasi from aktivasi_bku where id_periode=84) 
       when ab.id_periode=3 then (select tanggal_aktivasi from aktivasi_bku where id_periode=87) 
       when ab.id_periode=4 then (select tanggal_aktivasi from aktivasi_bku where id_periode=90) 
       end as tanggal_aktivasi, 
       case 
       when ab.id_periode=1 then (select tanggal_finish from aktivasi_bku where id_periode=83) 
       when ab.id_periode=2 then (select tanggal_finish from aktivasi_bku where id_periode=86) 
       when ab.id_periode=3 then (select tanggal_finish from aktivasi_bku where id_periode=89) 
       when ab.id_periode=4 then (select tanggal_finish from aktivasi_bku where id_periode=92) 
       end as tanggal_finish
    ,rp.periode as triwulan
    ,case when ((ab.saldo_akhir_bank!='') and (ab.saldo_akhir_tunai!='')) then (ab.saldo_akhir_bank+ab.saldo_akhir_tunai) else 0 end as sisa
    ,a.jumlah
    ,m.[npsn],m.[nama],m.[alamat],w3.[nama] as kec,w2.[nama] as kab, w1.[nama] as prop,m.[kepsek],nip_kepsek as nip,tu,nip_tu,(select varvalue from app_config where varname='nama_komite') as komite,(select varvalue from app_config where varname='nip_komite') as nip_komite 
from 
     aktivasi_bku ab 
     join anggaran a
          on ab.id_anggaran = a.id_anggaran
     join mst_sekolah m
          on a.sekolah_id = m.sekolah_id                    
     join mst_wilayah w3      
          on m.kode_wilayah||'  ' = w3.kode_wilayah          
     join mst_wilayah w2     
          on w3.mst_kode_wilayah = w2.kode_wilayah          
     join mst_wilayah w1     
          on w2.mst_kode_wilayah = w1.kode_wilayah  
     join ref_periode rp     
          on ab.id_periode = rp.id_periode  		  
where 
      ab.soft_delete = 0      
      and a.soft_delete = 0      
      and a.id_anggaran =:id_anggaran
      and ab.id_periode =:id_periode 