Select m.*,:sekolah_id as id_sekolah,:id_anggaran as id_anggaran, w3.nama as kec, case when m.bentuk_pendidikan_id in (5,6) then replace(w2.nama,'Kab.','Kabupaten') else replace(w1.nama,'Prop.','Propinsi') end kab 
from mst_sekolah m 
join mst_wilayah w3 on m.kode_wilayah = w3.kode_wilayah 
join mst_wilayah w2 on w3.mst_kode_wilayah = w2.kode_wilayah 
join mst_wilayah w1 on w2.mst_kode_wilayah = w1.kode_wilayah 
where m.soft_delete = 0 and m.sekolah_id=:sekolah_id