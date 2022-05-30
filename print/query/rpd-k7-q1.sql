select 
       m.[npsn],m.[nama],m.[alamat],w3.[nama] as kec,w2.[nama] as kab, w1.[nama] as prop,m.[kepsek],nip_kepsek as nip,tu,nip_tu,(select varvalue from app_config where varname='nama_komite') as komite,(select varvalue from app_config where varname='nip_komite') as nip_komite 
from 
     aktivasi_bku ab 
     join anggaran a
          on ab.id_anggaran = a.id_anggaran
     join mst_sekolah m
          on a.sekolah_id = m.sekolah_id                    
     join mst_wilayah w3      
          on m.kode_wilayah = w3.kode_wilayah          
     join mst_wilayah w2     
          on w3.mst_kode_wilayah = w2.kode_wilayah          
     join mst_wilayah w1     
          on w2.mst_kode_wilayah = w1.kode_wilayah                    
where 
      ab.soft_delete = 0      
      and a.soft_delete = 0      
      and a.id_anggaran =:id_anggaran
      and ab.id_periode =:id_periode 