select 
  '1' as no
  ,'Pendapatan' as uraian              
  ,(a.jumlah*0.3) as tahap1
  ,(a.jumlah*0.4) as tahap2
  ,(a.jumlah*0.3) as tahap3
  ,a.jumlah+a.sisa_anggaran as Jumlah
from 
  anggaran a
where 
  a.soft_delete = 0 
  and a.id_anggaran=:id_anggaran 
  and a.is_aktif=1

union all

select 
  '2.1' as no
  ,'Belanja Tidak Langsung' as uraian              
  ,0 as tahap1
  ,0 as tahap2
  ,0 as tahap3
  ,0 as Jumlah

union all

select 
  x.no  
  ,x.uraian
  ,x.triwulan1 as tahap1
  ,(x.triwulan2+((x.triwulan3/3)*2)) as tahap2 
  ,(x.triwulan4+((x.triwulan3/3)*1)) as tahap3
  ,x.jumlah 
from 
  (
  select
    '2.2' as no
    ,'Belanja Langsung' as uraian
    ,sum(case when rp.id_periode = 1 then rp.jumlah else 0 end) as triwulan1
    ,sum(case when rp.id_periode = 2 then rp.jumlah else 0 end) as triwulan2   
    ,sum(case when rp.id_periode = 3 then rp.jumlah else 0 end) as triwulan3   
    ,sum(case when rp.id_periode = 4 then rp.jumlah else 0 end) as triwulan4 
    , (sum(case when rp.id_periode = 1 then rp.jumlah else 0 end)+sum(case when rp.id_periode = 2 then rp.jumlah else 0 end)
      +sum(case when rp.id_periode = 3 then rp.jumlah else 0 end)+sum(case when rp.id_periode = 4 then rp.jumlah else 0 end)) as jumlah
  from 
    rapbs_periode rp
    join rapbs r 
      on rp.id_rapbs = r.id_rapbs
  where 
    rp.soft_delete = 0 
    and r.soft_delete=0 
    and r.id_anggaran=:id_anggaran    
  )x

union all

select 
  '3.1' as no
  ,'Penerimaan Pembiayaan' as uraian              
  ,0 as tahap1
  ,0 as tahap2
  ,0 as tahap3
  ,0 as Jumlah

union all

select 
  '2.1' as no
  ,'Pengeluaran Pembiayaan' as uraian              
  ,0 as tahap1
  ,0 as tahap2
  ,0 as tahap3
  ,0 as Jumlah

