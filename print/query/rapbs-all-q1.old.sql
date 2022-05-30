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
       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when substr(r.[keterangan],1,4) = 'sisa' then r.jumlah else 0 end) as komite

       ,1 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_kode = r3.id_kode
join ref_kode r2 on r3.parent_kode = r2.id_kode
join ref_kode r1 on r2.parent_kode = r1.id_kode 
where s.id_anggaran=:id_anggaran
and r.soft_delete = 0 and s.soft_delete=0
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
       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when substr(r.[keterangan],1,4) = 'sisa' then r.jumlah else 0 end) as komite

       ,2 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_kode = r3.id_kode
join ref_kode r2 on r3.parent_kode = r2.id_kode
join ref_kode r1 on r2.parent_kode = r1.id_kode 
where s.id_anggaran=:id_anggaran
and r.soft_delete = 0 and s.soft_delete=0
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
       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when substr(r.[keterangan],1,4) = 'sisa' then r.jumlah else 0 end) as komite

       ,3 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_kode = r3.id_kode
join ref_kode r2 on r3.parent_kode = r2.id_kode
join ref_kode r1 on r2.parent_kode = r1.id_kode 
where s.id_anggaran=:id_anggaran
and r.soft_delete = 0 and s.soft_delete=0
group by r3.id_kode

union 

select 
       r.id_kode as id_kode 
       ,substr(r.id_kode,1,3) as kode_program
       ,substr(r.id_kode,4,3) as kode_sub_program
       ,substr(r.id_kode,7,3) as kd_kegiatan
       ,r.kode_rekening as kode_rekening
       ,r.id_kode||'.'||r.kode_rekening as urutan
       ,null as urutan_text       
       ,'<i>'||k.rekening||'</i>' as uraian       
       ,sum(r.jumlah) as jumlah
       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when substr(r.[keterangan],1,4) = 'sisa' then r.jumlah else 0 end) as komite

       ,4 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_kode = r3.id_kode
where s.id_anggaran=:id_anggaran
and r.soft_delete = 0 and s.soft_delete=0
group by r.id_kode,r.kode_rekening,k.rekening

union 

select 
       r.id_kode as id_kode 
       ,substr(r.id_kode,1,3) as kode_program
       ,substr(r.id_kode,4,3) as kode_sub_program
       ,substr(r.id_kode,7,3) as kd_kegiatan
       ,r.kode_rekening as kode_rekening
       ,r.id_kode||'.'||r.kode_rekening||'.'||r.urutan as urutan
       ,r.urutan as urutan_text       
       ,'  '||r.urutan||'. '||r.uraian_text as uraian       
       ,sum(r.jumlah) as jumlah
       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 1 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as pusat_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 2 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as prop_blok3   

       ,sum(case when k.blokid = 1 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok1
       ,sum(case when k.blokid = 2 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok2   
       ,sum(case when k.blokid = 3 and s.id_ref_sumber_dana = 3 and (substr(r.[keterangan],1,4) <> 'sisa' or r.keterangan is null) then r.jumlah else 0 end) as kab_blok3   

       ,sum(case when substr(r.[keterangan],1,4) = 'sisa' then r.jumlah else 0 end) as komite

       ,5 as color_id
from rapbs r
join ref_rekening k on r.kode_rekening = k.kode_rekening 
join anggaran s on r.id_anggaran = s.id_anggaran
join ref_kode r3 on r.id_kode = r3.id_kode
where s.id_anggaran=:id_anggaran
and r.soft_delete = 0 and s.soft_delete=0
group by r.id_kode,r.id_rapbs,r3.uraian_kode,r.kode_rekening,r.uraian


order by urutan
