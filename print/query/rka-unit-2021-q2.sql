select 
  1 as urutan
  ,null as kode_rekening
  ,'JUMLAH PENDAPATAN' as uraian              
  ,sum(a.jumlah)+sum(a.sisa_anggaran) as jumlah
from
  anggaran a     
where 
  a.id_anggaran=:id_anggaran
  and a.soft_delete = 0

union all

select 
  2 as urutan
  ,'5' as kode_rekening
  ,'BELANJA' as uraian              
  ,sum(r.jumlah) as jumlah
from 
  rapbs r
  join ref_rekening rr 
    on r.kode_rekening = rr.kode_rekening
where 
  r.soft_delete = 0 
  and r.id_anggaran=:id_anggaran

union all

select 
  3 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.1' as kode_rekening
      ,'BELANJA OPERASI' as uraian          
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,3) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,3)
    )b on a.kode_rekening = b.kode_rekening


union all 

select 
  4 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.1.02' as kode_rekening
      ,'BELANJA BARANG DAN JASA' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,6) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,6)
    )b on a.kode_rekening = b.kode_rekening


union all 

select 
  5 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.1.02.01' as kode_rekening
      ,'BELANJA BARANG' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,9) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,9)
    )b on a.kode_rekening = b.kode_rekening

union all

select 
  6 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.1.02.02' as kode_rekening
      ,'BELANJA JASA' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,9) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,9)
    )b on a.kode_rekening = b.kode_rekening

union all

select 
  7 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.1.02.03' as kode_rekening
      ,'BELANJA PEMELIHARAAN' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,9) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,9)
    )b on a.kode_rekening = b.kode_rekening

union all

select 
  8 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.1.02.04' as kode_rekening
      ,'BELANJA PERJALANAN DINAS' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,9) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,9)
    )b on a.kode_rekening = b.kode_rekening

union all

select 
  9 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.2' as kode_rekening
      ,'BELANJA MODAL' as uraian              
      ,3 as blokid              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,3) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,3)
    )b on a.kode_rekening = b.kode_rekening

union all 

select 
  10 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.2.02' as kode_rekening
      ,'BELANJA MODAL PERALATAN DAN MESIN' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,6) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,6)
    )b on a.kode_rekening = b.kode_rekening

union all

select 
  11 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.2.05' as kode_rekening
      ,'BELANJA MODAL ASET TETAP LAINNYA' as uraian              
  )a
  left join 
    (
      select 
        substr(r.kode_rekening,1,6) kode_rekening
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by substr(r.kode_rekening,1,6)
    )b on a.kode_rekening = b.kode_rekening

union all 

select 
  12 as urutan
  ,null as kode_rekening
  ,'JUMLAH BELANJA' as uraian              
  ,sum(r.jumlah) as jumlah
from 
  rapbs r
  join ref_rekening rr 
    on r.kode_rekening = rr.kode_rekening
where 
  r.soft_delete = 0 
  and r.id_anggaran=:id_anggaran


union all

select 
  13 as urutan
  ,null as kode_rekening
  ,case 
    when 
      (
        (
          select 
            cast(sum(a.jumlah) as float) as jumlah 
          from 
            anggaran a 
          where 
            a.soft_delete = 0 
            and a.id_anggaran=:id_anggaran
        ) - 
        (
          select 
            sum(r.jumlah) as jumlah 
          from 
            rapbs r 
            join ref_rekening rr 
              on r.kode_rekening = rr.kode_rekening 
          where 
            r.soft_delete = 0 
            and r.id_anggaran=:id_anggaran
        )
      ) > 0 then 'SURPLUS' else 'DEFISIT' end as uraian              
  ,(
    select 
      sum(a.jumlah)+sum(a.sisa_anggaran) as jumlah 
    from 
      anggaran a 
    where 
      a.soft_delete = 0 
      and a.id_anggaran=:id_anggaran
  ) - 
  (
    select 
         sum(r.jumlah) as jumlah 
    from 
      rapbs r 
      join ref_rekening rr 
        on r.kode_rekening = rr.kode_rekening 
    where 
      r.soft_delete = 0 
      and r.id_anggaran=:id_anggaran
  )
   as jumlah

order by urutan
