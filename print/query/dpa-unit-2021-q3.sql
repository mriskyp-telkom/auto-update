select 
  '1' as no
  ,'Pendapatan' as uraian              
  ,(a.jumlah*0.3) as triwulan1
  ,(a.jumlah*0.24) as triwulan2
  ,(a.jumlah*0.235) as triwulan3
  ,(a.jumlah*0.225) as triwulan4
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
  ,'Belanja Operasi' as uraian              
  ,sum(case when rp.id_periode in (81,82,83) then rp.jumlah else 0 end) as triwulan1
  ,sum(case when rp.id_periode in (84,85,86) then rp.jumlah else 0 end) as triwulan2   
  ,sum(case when rp.id_periode in (87,88,89) then rp.jumlah else 0 end) as triwulan3   
  ,sum(case when rp.id_periode in (90,91,92) then rp.jumlah else 0 end) as triwulan4 
  , (sum(case when rp.id_periode in (81,82,83) then rp.jumlah else 0 end)+sum(case when rp.id_periode in (84,85,86) then rp.jumlah else 0 end)
    +sum(case when rp.id_periode in (87,88,89) then rp.jumlah else 0 end)+sum(case when rp.id_periode in (90,91,92) then rp.jumlah else 0 end)) as jumlah
from 
  rapbs_periode rp
  join rapbs r 
    on rp.id_rapbs = r.id_rapbs
where 
  rp.soft_delete = 0 
  and r.soft_delete=0 
  and r.id_anggaran=:id_anggaran      
  and substr(r.kode_rekening,1,3) = '5.1'


union all

select
  '2.2' as no
  ,'Belanja Modal' as uraian
  ,sum(case when rp.id_periode in (81,82,83) then rp.jumlah else 0 end) as triwulan1
  ,sum(case when rp.id_periode in (84,85,86) then rp.jumlah else 0 end) as triwulan2   
  ,sum(case when rp.id_periode in (87,88,89) then rp.jumlah else 0 end) as triwulan3   
  ,sum(case when rp.id_periode in (90,91,92) then rp.jumlah else 0 end) as triwulan4 
  , (sum(case when rp.id_periode in (81,82,83) then rp.jumlah else 0 end)+sum(case when rp.id_periode in (84,85,86) then rp.jumlah else 0 end)
    +sum(case when rp.id_periode in (87,88,89) then rp.jumlah else 0 end)+sum(case when rp.id_periode in (90,91,92) then rp.jumlah else 0 end)) as jumlah
from 
  rapbs_periode rp
  join rapbs r 
    on rp.id_rapbs = r.id_rapbs
where 
  rp.soft_delete = 0 
  and r.soft_delete=0 
  and r.id_anggaran=:id_anggaran      
  and substr(r.kode_rekening,1,3) = '5.2'

union all

select 
  '3.1' as no
  ,'Penerimaan Pembiayaan' as uraian              
  ,0 as triwulan1
  ,0 as triwulan2
  ,0 as triwulan3
  ,0 as triwulan4
  ,0 as Jumlah

union all

select 
  '4.1' as no
  ,'Pengeluaran Pembiayaan' as uraian              
  ,0 as triwulan1
  ,0 as triwulan2
  ,0 as triwulan3
  ,0 as triwulan4
  ,0 as Jumlah
