select 
       '5.' as kode_rekening
       ,'BELANJA' as rekening
       ,null as volume       
       ,null as satuan       
       ,null as harga_satuan
       ,ifnull(sum(jumlah),0) as jumlah       
       ,1 as color_id
from 
     rapbs r
     join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0 

union 

select 
       '5.2.' as kode_rekening
       ,'BELANJA LANGSUNG' as rekening
       ,null as volume       
       ,null as satuan       
       ,null as harga_satuan
       ,ifnull(sum(jumlah),0) as jumlah       
       ,2 as color_id
from 
     rapbs r
     join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0 

union 

select 
       '5.2.'||rr.blokid||'.' as kode_rekening
       ,case when rr.blokid = 1 then 'BELANJA PEGAWAI' when rr.blokid = 2 then 'BELANJA BARANG DAN JASA' when rr.blokid = 3 then 'BELANJA MODAL' end as rekening
       ,null as volume       
       ,null as satuan       
       ,null as harga_satuan
       ,ifnull(sum(jumlah),0) as jumlah       
       ,3 as color_id
from 
     rapbs r
     join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0  

union 

select 
       substr(rr.kode_rekening,1,9) as kode_rekening
       ,rr.neraca as rekening
       ,null as volume       
       ,null as satuan       
       ,null as harga_satuan
       ,ifnull(sum(jumlah),0) as jumlah       
       ,4 as color_id
from 
     rapbs r
     join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0 
group by  substr(rr.kode_rekening,1,9),rr.neraca 


union

select 
       r.kode_rekening as kode_rekening
       ,rr.rekening as rekening       
       ,null as volume       
       ,null as satuan       
       ,null as harga_satuan
       ,ifnull(sum(jumlah),0) as jumlah       
       ,5 as color_id
from 
     rapbs r
     join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0 
group by r.kode_rekening, rr.rekening

union

select 
       r.kode_rekening||r.urutan||'.' as kode_rekening
       ,r.uraian as rekening       
       ,r.volume       
       ,r.satuan       
       ,r.harga_satuan
       ,ifnull(jumlah,0) as jumlah       
       ,6 as color_id       
from 
     rapbs r
     join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete=0

order by kode_rekening
