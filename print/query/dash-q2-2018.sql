select 
       'Belanja Pegawai' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join anggaran s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and r.kode_rekening like '5.2.1%'
      )rpa
union
select 
       'Belanja Jasa' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join anggaran s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and r.kode_rekening like '5.2.2%'            
            and r.kode_rekening not in (select kode_rekening from ref_acuan_barang where kode_rekening is not null and expired_date is null and kode_belanja<>'RBHP')
      )rpa
union
select 
       'Barang Habis Pakai' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join anggaran s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and r.kode_rekening like '5.2.2%'            
            and r.kode_rekening in (select kode_rekening from ref_acuan_barang where kode_rekening is not null and expired_date is null and kode_belanja='RBHP')
      )rpa      
union
select 
       'Barang Modal' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join anggaran s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and r.kode_rekening like '5.2.3%'            
      )rpa
