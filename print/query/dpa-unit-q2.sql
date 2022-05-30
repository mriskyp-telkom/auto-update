select 1 as urutan, 
null as kode_rekening
,'JUMLAH PENDAPATAN' as uraian              
,1*cast(sum(a.jumlah)+sum(a.sisa_anggaran) as float) as jumlah
from
    anggaran a     
where a.sekolah_id=:sekolah_id and a.id_anggaran=:id_anggaran
and a.soft_delete = 0

union
select 2 as urutan, 
'5' as kode_rekening
,'BELANJA' as uraian              
,1*cast(sum(r.jumlah) as float) as jumlah
from rapbs r
join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.soft_delete = 0 and r.id_anggaran=:id_anggaran

union

select 3 as urutan, 
'5.1.' as kode_rekening
,'BELANJA TIDAK LANGSUNG' as uraian              
,1*cast(0 as float) as jumlah

union

select 4 as urutan, 
'5.1.1' as kode_rekening
,'BELANJA PEGAWAI' as uraian              
,1*cast(0 as float) as jumlah

union

select 5 as urutan, 
'5.2' as kode_rekening
,'BELANJA LANGSUNG' as uraian
,1*cast(sum(r.jumlah) as float) as jumlah
from rapbs r
join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.soft_delete = 0 and r.id_anggaran=:id_anggaran

union 

select 6 as urutan, 
       a.kode_rekening
       ,a.uraian
       ,1*cast(ifnull(b.jumlah,0) as float) as jumlah
from   (
         select 
              '5.2.1' as kode_rekening
              ,'BELANJA PEGAWAI' as uraian              
              ,1 as blokid              
       )a
       left join (
            select 
                   rr.blokid
                   ,sum(r.jumlah) as jumlah 
            from 
                 rapbs r 
                 join ref_rekening rr 
                      on r.kode_rekening = rr.kode_rekening 
            where r.sekolah_id=:sekolah_id  and r.soft_delete = 0 and r.id_anggaran=:id_anggaran
            group by rr.blokid
       )b on a.blokid = b.blokid


union

select 7 as urutan, 
       a.kode_rekening
       ,a.uraian
       ,1*cast(ifnull(b.jumlah,0) as float) as jumlah
from   (
         select 
              '5.2.2' as kode_rekening
              ,'BELANJA BARANG DAN JASA' as uraian              
              ,2 as blokid              
       )a
       left join (
            select 
                   rr.blokid
                   ,sum(r.jumlah) as jumlah 
            from 
                 rapbs r 
                 join ref_rekening rr 
                      on r.kode_rekening = rr.kode_rekening 
            where r.sekolah_id=:sekolah_id and r.soft_delete = 0 and r.id_anggaran=:id_anggaran
            group by rr.blokid
       )b on a.blokid = b.blokid

union

select 8 as urutan, 
       a.kode_rekening
       ,a.uraian
       ,1*cast(ifnull(b.jumlah,0) as float) as jumlah
from   (
         select 
              '5.2.3' as kode_rekening
              ,'BELANJA MODAL' as uraian              
              ,3 as blokid              
       )a
       left join (
            select 
                   rr.blokid
                   ,sum(r.jumlah) as jumlah 
            from 
                 rapbs r 
                 join ref_rekening rr 
                      on r.kode_rekening = rr.kode_rekening 
            where r.sekolah_id=:sekolah_id and r.soft_delete = 0 and r.id_anggaran=:id_anggaran
            group by rr.blokid
       )b on a.blokid = b.blokid

union 

select 9 as urutan, 
null as kode_rekening
,'JUMLAH BELANJA' as uraian              
,1*cast(sum(r.jumlah) as float) as jumlah
from rapbs r
join ref_rekening rr on r.kode_rekening = rr.kode_rekening
where r.sekolah_id=:sekolah_id and r.soft_delete = 0 and r.id_anggaran=:id_anggaran


union

select 10 as urutan, 
null as kode_rekening
,case 
      when (
           (
              select 
                     cast(sum(a.jumlah) as float) as jumlah 
              from anggaran a 
              where 
                    a.sekolah_id=:sekolah_id 
                    and a.soft_delete = 0 and a.id_anggaran=:id_anggaran
           ) - 
           (
               select 
                      cast(sum(r.jumlah) as float) as jumlah 
               from rapbs r 
               join ref_rekening rr 
                    on r.kode_rekening = rr.kode_rekening 
               where 
                     r.sekolah_id=:sekolah_id 
                     and r.soft_delete = 0 and r.id_anggaran=:id_anggaran
           )
        ) > 0 
      then 'SURPLUS' else 'DEFISIT' end as uraian              
,1*((
  select 
         cast(sum(a.jumlah)+sum(a.sisa_anggaran) as float) as jumlah 
  from anggaran a 
  where 
        a.sekolah_id=:sekolah_id 
        and a.soft_delete = 0 and a.id_anggaran=:id_anggaran
  ) - 
  (
  select 
         cast(sum(r.jumlah) as float) as jumlah 
  from rapbs r 
  join ref_rekening rr 
       on r.kode_rekening = rr.kode_rekening 
  where 
        r.sekolah_id=:sekolah_id 
        and r.soft_delete = 0 and r.id_anggaran=:id_anggaran
  )) as jumlah

order by urutan
