select 
       r1.id_kode as id_kode
       ,substr(r1.id_kode,1,3) as kode_program
       ,null as kode_sub_program
       ,null as kd_kegiatan
       ,null as kode_rekening       
       ,r1.id_kode as urutan       
       ,r1.uraian_kode as uraian
       ,sum(dr.jumlah) as jumlah
       ,sum(case when dr.id_periode in (81,82,83) then dr.jumlah else 0 end) as tahap1
       ,sum(case when dr.id_periode in (84,85,86,87,88) then dr.jumlah else 0 end) as tahap2
       ,sum(case when dr.id_periode in (89,90,91,92) then dr.jumlah else 0 end) as tahap3
       ,1 as color_id
	   ,null as volume
	   ,null as satuan
	   ,null as tariff
from rapbs r
join rapbs_periode dr on r.id_rapbs = dr.id_rapbs 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
join ref_kode r2 on r3.parent_kode = r2.id_ref_kode
join ref_kode r1 on r2.parent_kode = r1.id_ref_kode 
where r.id_anggaran=:id_anggaran
and dr.soft_delete=0 and r.soft_delete=0
group by r1.id_kode,r1.uraian_kode

union

select 
       r2.id_kode as id_kode 
       ,substr(r2.id_kode,1,3) as kode_program
       ,substr(r2.id_kode,4,3)  as kode_sub_program
       ,null as kd_kegiatan
       ,null as kode_rekening       
       ,r2.id_kode as urutan       
       ,r2.uraian_kode as uraian
       ,sum(dr.jumlah) as jumlah
       ,sum(case when dr.id_periode in (81,82,83) then dr.jumlah else 0 end) as tahap1
       ,sum(case when dr.id_periode in (84,85,86,87,88) then dr.jumlah else 0 end) as tahap2
       ,sum(case when dr.id_periode in (89,90,91,92) then dr.jumlah else 0 end) as tahap3
       ,2 as color_id
	   ,null as volume
	   ,null as satuan
	   ,null as tariff
from rapbs r
join rapbs_periode dr on r.id_rapbs = dr.id_rapbs 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
join ref_kode r2 on r3.parent_kode = r2.id_ref_kode
join ref_kode r1 on r2.parent_kode = r1.id_ref_kode 
where r.id_anggaran=:id_anggaran
and dr.soft_delete=0 and r.soft_delete=0
group by r2.id_kode



union

select 
       r3.id_kode as id_kode 
       ,substr(r3.id_kode,1,3) as kode_program
       ,substr(r3.id_kode,4,3) as kode_sub_program
       ,substr(r3.id_kode,7,3) as kd_kegiatan
       ,null as kode_rekening       
       ,r3.id_kode as urutan       
       ,r3.uraian_kode as uraian
       ,sum(dr.jumlah) as jumlah
       ,sum(case when dr.id_periode in (81,82,83) then dr.jumlah else 0 end) as tahap1
       ,sum(case when dr.id_periode in (84,85,86,87,88) then dr.jumlah else 0 end) as tahap2
       ,sum(case when dr.id_periode in (89,90,91,92) then dr.jumlah else 0 end) as tahap3
       ,3 as color_id
	   ,null as volume
	   ,null as satuan
	   ,null as tariff
from rapbs r
join rapbs_periode dr on r.id_rapbs = dr.id_rapbs 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
join ref_kode r2 on r3.parent_kode = r2.id_ref_kode
join ref_kode r1 on r2.parent_kode = r1.id_ref_kode 
where r.id_anggaran=:id_anggaran
and dr.soft_delete=0 and r.soft_delete=0
group by r3.id_kode

union 

select 
       r3.id_kode as id_kode 
       ,substr(r3.id_kode,1,3) as kode_program
       ,substr(r3.id_kode,4,3) as kode_sub_program
       ,substr(r3.id_kode,7,3) as kd_kegiatan
       ,r.kode_rekening as kode_rekening
       ,r3.id_kode||'.'||r.kode_rekening||'.'||r.urutan as urutan       
       ,r.uraian as uraian       
       ,sum(dr.jumlah) as jumlah
       ,sum(case when dr.id_periode in (81,82,83) then dr.jumlah else 0 end) as tahap1
       ,sum(case when dr.id_periode in (84,85,86,87,88) then dr.jumlah else 0 end) as tahap2
       ,sum(case when dr.id_periode in (89,90,91,92) then dr.jumlah else 0 end) as tahap3
       ,4 as color_id
	   ,r.volume as volume
	   ,r.satuan as satuan
	   ,r.harga_satuan as tariff
from rapbs r
join rapbs_periode dr on r.id_rapbs = dr.id_rapbs 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
where r.id_anggaran=:id_anggaran
and dr.soft_delete=0 and r.soft_delete=0
group by r3.id_kode,r.id_rapbs,r3.uraian_kode,r.kode_rekening,r.uraian,r.volume,r.satuan,r.harga_satuan
order by urutan
