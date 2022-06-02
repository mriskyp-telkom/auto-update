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
  ,'5.1.' as kode_rekening
  ,'BELANJA TIDAK LANGSUNG' as uraian              
  ,0 as jumlah

union all

select 
  4 as urutan
  ,'5.1.1' as kode_rekening
  ,'BELANJA PEGAWAI' as uraian              
  ,0 as jumlah

union all

select 
  5 as urutan
  ,'5.2' as kode_rekening
  ,'BELANJA LANGSUNG' as uraian
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
  6 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.2.1' as kode_rekening
      ,'BELANJA PEGAWAI' as uraian              
      ,1 as blokid              
  )a
  left join 
    (
      select 
        rr.blokid
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by rr.blokid
    )b on a.blokid = b.blokid


union all

select 
  7 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.2.2' as kode_rekening
      ,'BELANJA BARANG DAN JASA' as uraian              
      ,2 as blokid              
  )a
  left join 
    (
      select 
        rr.blokid
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
       r.soft_delete = 0 
       and r.id_anggaran=:id_anggaran
      group by rr.blokid
    )b on a.blokid = b.blokid

union all

select 
  8 as urutan
  ,a.kode_rekening
  ,a.uraian
  ,ifnull(b.jumlah,0) as jumlah
from   
  (
    select 
      '5.2.3' as kode_rekening
      ,'BELANJA MODAL' as uraian              
      ,3 as blokid              
  )a
  left join 
    (
      select 
        rr.blokid
        ,sum(r.jumlah) as jumlah 
      from 
        rapbs r 
        join ref_rekening rr 
          on r.kode_rekening = rr.kode_rekening 
      where 
        r.soft_delete = 0 
        and r.id_anggaran=:id_anggaran
      group by rr.blokid
    )b on a.blokid = b.blokid

union all 

select 
  9 as urutan
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
  10 as urutan
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
