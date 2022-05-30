select 
       m.[npsn],m.[nama],m.[alamat],w3.[nama] as kec,w2.[nama] as kab, w1.[nama] as prop,m.[kepsek],nip_kepsek as nip,tu,nip_tu,(select varvalue from app_config where varname='nama_komite') as komite,(select varvalue from app_config where varname='nip_komite') as nip_komite,
       (case when (select count(*) from kas_umum where soft_delete= 0 and id_ref_bku=2 and id_anggaran=:id_anggaran)=1 then 'Triwulan I'       
             when (select count(*) from kas_umum where soft_delete= 0 and id_ref_bku=2 and id_anggaran=:id_anggaran)=2 then 'Triwulan II'             
             when (select count(*) from kas_umum where soft_delete= 0 and id_ref_bku=2 and id_anggaran=:id_anggaran)=3 then 'Triwulan III'             
             when (select count(*) from kas_umum where soft_delete= 0 and id_ref_bku=2 and id_anggaran=:id_anggaran)=4 then 'Triwulan IV'
        END       
       ) as triwulan,
       (case when m.bentuk_pendidikan_id=5 then 'Sekolah Dasar'
             when m.bentuk_pendidikan_id=6 then 'Sekolah Menengah Pertama'             
             when m.bentuk_pendidikan_id=13 then 'Sekolah Menengah Atas'             
             when m.bentuk_pendidikan_id=15 then 'Sekolah Menengah Kejuruan'             
             when m.bentuk_pendidikan_id=29 then 'Sekolah Luar Biasa'
        END       
       ) as satuan_pendidikan
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