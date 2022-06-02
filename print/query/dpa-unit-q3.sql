select 
'1' as no
,'Pendapatan' as uraian              
,(a.jumlah*0.2)+(
                 a.sisa_anggaran
                 -ifnull(
                         (select rp.jumlah 
                         from rapbs_periode rp 
                         join rapbs r on rp.id_rapbs = r.id_rapbs 
                         where :sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and 
                         r.soft_delete = 0 and substr(r.keterangan,1,4)='sisa' 
                         and rp.soft_delete=0 and rp.id_periode=2
                         ),0)
                 -ifnull(
                         (select rp.jumlah 
                         from rapbs_periode rp 
                         join rapbs r on rp.id_rapbs = r.id_rapbs 
                         where :sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and 
                         r.soft_delete = 0 and substr(r.keterangan,1,4)='sisa' 
                         and rp.soft_delete=0 and rp.id_periode=3
                         ),0)
                 -ifnull(
                         (select rp.jumlah 
                         from rapbs_periode rp 
                         join rapbs r on rp.id_rapbs = r.id_rapbs 
                         where :sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and 
                         r.soft_delete = 0 and substr(r.keterangan,1,4)='sisa' 
                         and rp.soft_delete=0 and rp.id_periode=4
                         ),0)
                 ) 
as triwulan1
,(a.jumlah*0.4)+(ifnull((select rp.jumlah from rapbs_periode rp join rapbs r on rp.id_rapbs = r.id_rapbs where :sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete = 0 and substr(r.keterangan,1,4)='sisa' and rp.soft_delete=0 and rp.id_periode=2),0)) as triwulan2
,a.jumlah*0.2+(ifnull((select rp.jumlah from rapbs_periode rp join rapbs r on rp.id_rapbs = r.id_rapbs where :sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete = 0 and substr(r.keterangan,1,4)='sisa' and rp.soft_delete=0 and rp.id_periode=3),0)) as triwulan3
,a.jumlah*0.2+(ifnull((select rp.jumlah from rapbs_periode rp join rapbs r on rp.id_rapbs = r.id_rapbs where :sekolah_id=:sekolah_id and r.id_anggaran=:id_anggaran and r.soft_delete = 0 and substr(r.keterangan,1,4)='sisa' and rp.soft_delete=0 and rp.id_periode=4),0)) as triwulan4
,a.jumlah+a.sisa_anggaran as Jumlah
from anggaran a
where a.sekolah_id=:sekolah_id and a.soft_delete = 0 and a.id_anggaran=:id_anggaran and a.is_aktif=1

union

select 
'2.1' as no
,'Belanja Tidak Langsung' as uraian              
,0 as triwulan1
,0 as triwulan2
,0 as triwulan3
,0 as triwulan4
,0 as Jumlah

union

select
'2.2' as no
,'Belanja Langsung' as uraian
,sum(case when rp.id_periode = 1 then rp.jumlah else 0 end) as triwulan1
,sum(case when rp.id_periode = 2 then rp.jumlah else 0 end) as triwulan2   
,sum(case when rp.id_periode = 3 then rp.jumlah else 0 end) as triwulan3   
,sum(case when rp.id_periode = 4 then rp.jumlah else 0 end) as triwulan4 
, (sum(case when rp.id_periode = 1 then rp.jumlah else 0 end)+sum(case when rp.id_periode = 2 then rp.jumlah else 0 end)
  +sum(case when rp.id_periode = 3 then rp.jumlah else 0 end)+sum(case when rp.id_periode = 4 then rp.jumlah else 0 end)) as jumlah
from rapbs_periode rp
join rapbs r on rp.id_rapbs = r.id_rapbs
where r.sekolah_id=:sekolah_id and rp.soft_delete = 0 and r.soft_delete=0 and r.id_anggaran=:id_anggaran

union

select 
'3.1' as no
,'Penerimaan Pembiayaan' as uraian              
,0 as triwulan1
,0 as triwulan2
,0 as triwulan3
,0 as triwulan4
,0 as Jumlah

Union

select 
'2.1' as no
,'Pengeluaran Pembiayaan' as uraian              
,0 as triwulan1
,0 as triwulan2
,0 as triwulan3
,0 as triwulan4
,0 as Jumlah
