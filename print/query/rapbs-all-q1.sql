select 
       r1.id_kode as id_kode
       ,substr(r1.id_kode,1,3) as kode_program
       ,null as kode_sub_program
       ,null as kd_kegiatan
       ,null as kode_rekening       
       ,r1.id_kode as urutan       
       ,null as urutan_text       
       ,r1.uraian_kode as uraian
       ,sum(r.jumlah) as jumlah
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when s.id_ref_sumber_dana in (33,34,35) then r.jumlah else 0 end) as komite

       ,1 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
join ref_kode r2 on r3.parent_kode = r2.id_ref_kode
join ref_kode r1 on r2.parent_kode = r1.id_ref_kode 
where r.soft_delete = 0 and s.soft_delete=0
and s.id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4)
group by r1.id_kode

union

select 
       r2.id_kode as id_kode 
       ,substr(r2.id_kode,1,3) as kode_program
       ,substr(r2.id_kode,4,3)  as kode_sub_program
       ,null as kd_kegiatan
       ,null as kode_rekening       
       ,r2.id_kode as urutan       
       ,null as urutan_text       
       ,r2.uraian_kode as uraian
       ,sum(r.jumlah) as jumlah
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when s.id_ref_sumber_dana in (33,34,35) then r.jumlah else 0 end) as komite

       ,2 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
join ref_kode r2 on r3.parent_kode = r2.id_ref_kode
join ref_kode r1 on r2.parent_kode = r1.id_ref_kode 
where r.soft_delete = 0 and s.soft_delete=0
and s.id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4)
group by r2.id_kode



union

select 
       r3.id_kode as id_kode 
       ,substr(r3.id_kode,1,3) as kode_program
       ,substr(r3.id_kode,4,3) as kode_sub_program
       ,substr(r3.id_kode,7,3) as kd_kegiatan
       ,null as kode_rekening       
       ,r3.id_kode as urutan       
       ,null as urutan_text       
       ,r3.uraian_kode as uraian
       ,sum(r.jumlah) as jumlah
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when s.id_ref_sumber_dana in (33,34,35) then r.jumlah else 0 end) as komite

       ,3 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
join ref_kode r2 on r3.parent_kode = r2.id_ref_kode
join ref_kode r1 on r2.parent_kode = r1.id_ref_kode 
where r.soft_delete = 0 and s.soft_delete=0
and s.id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4)
group by r3.id_kode

union 

select 
       r3.id_kode as id_kode 
       ,substr(r3.id_kode,1,3) as kode_program
       ,substr(r3.id_kode,4,3) as kode_sub_program
       ,substr(r3.id_kode,7,3) as kd_kegiatan
       ,r.kode_rekening as kode_rekening
       ,r3.id_kode||'.'||r.kode_rekening as urutan
       ,null as urutan_text       
       ,'<i>'||k.rekening||'</i>' as uraian       
       ,sum(r.jumlah) as jumlah
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when s.id_ref_sumber_dana in (33,34,35) then r.jumlah else 0 end) as komite

       ,4 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
where r.soft_delete = 0 and s.soft_delete=0
and s.id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4)
group by r3.id_kode,r.kode_rekening,k.rekening

union 

select 
       r3.id_kode as id_kode 
       ,substr(r3.id_kode,1,3) as kode_program
       ,substr(r3.id_kode,4,3) as kode_sub_program
       ,substr(r3.id_kode,7,3) as kd_kegiatan
       ,r.kode_rekening as kode_rekening
       ,r3.id_kode||'.'||r.kode_rekening||'.'||r.urutan as urutan
       ,r.urutan as urutan_text       
       ,'  '||r.urutan||'. '||r.uraian_text as uraian       
       ,sum(r.jumlah) as jumlah
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 1 then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 3 then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.1' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok1
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.2' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when substr(k.kode_rekening,1,5) = '5.2.3' and s.id_ref_sumber_dana = 5 then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when s.id_ref_sumber_dana in (33,34,35) then r.jumlah else 0 end) as komite

       ,5 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_ref_kode = r3.id_ref_kode
where r.soft_delete = 0 and s.soft_delete=0
and s.id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4)
group by r3.id_kode,r.id_rapbs,r3.uraian_kode,r.kode_rekening,r.uraian


order by urutan

