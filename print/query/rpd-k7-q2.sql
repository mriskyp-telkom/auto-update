Select
      rk3.id_kode as id_kode 
      ,rper.periode     
      ,ab.tanggal_aktivasi      
      ,ab.tanggal_finish
      ,rk3.uraian_kode as uraian_kode
      ,sum(j.jumlah) as jumlah      
      ,sum(j.pusat) as pusat      
      ,1 as color_id
from
	(select
		  r.id_ref_kode   
      ,rp.id_periode
      ,r.id_anggaran     
		  , sum(r.jumlah) as jumlah
		  , sum(k.saldo) as pusat
	from 
		 kas_umum k     
		 join rapbs_periode rp on k.id_rapbs_periode = rp.id_rapbs_periode     
		 join rapbs r on rp.id_rapbs = r.id_rapbs     
	where k.soft_delete = 0 and rp.soft_delete = 0 and r.soft_delete = 0
  and k.id_anggaran = :id_anggaran and k.tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and k.tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
	group by r.id_ref_kode
	)j
  join ref_kode rk on j.[id_ref_kode] = rk.id_ref_kode  
  join ref_kode rk2 on rk.[parent_kode] = rk2.id_ref_kode
  join ref_kode rk3 on rk2.[parent_kode] = rk3.id_ref_kode 
  left join (select * from aktivasi_bku where soft_delete = 0) ab on j.id_anggaran = ab.id_anggaran      
  left join (select * from ref_periode) rper on j.id_periode = rper.id_periode 
group by rk3.id_kode,rk3.uraian_kode

union

Select
      rk2.id_kode as id_kode 
      ,rper.periode       
      ,ab.tanggal_aktivasi      
      ,ab.tanggal_finish
      ,rk2.uraian_kode as uraian_kode
      ,sum(j.jumlah) as jumlah      
      ,sum(j.pusat) as pusat      
      ,2 as color_id
from
	(select
		  r.id_ref_kode   
      ,rp.id_periode 
      ,r.id_anggaran 
		  , sum(r.jumlah) as jumlah
		  , sum(k.saldo) as pusat
	from 
		 kas_umum k     
		 join rapbs_periode rp on k.id_rapbs_periode = rp.id_rapbs_periode     
		 join rapbs r on rp.id_rapbs = r.id_rapbs     
	where k.soft_delete = 0 and rp.soft_delete = 0 and r.soft_delete = 0
  and k.id_anggaran = :id_anggaran and k.tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and k.tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
	group by r.id_ref_kode
	)j
  join ref_kode rk on j.[id_ref_kode] = rk.id_ref_kode  
  join ref_kode rk2 on rk.[parent_kode] = rk2.id_ref_kode  
  left join (select * from aktivasi_bku where soft_delete = 0) ab on j.id_anggaran = ab.id_anggaran  
  left join (select * from ref_periode) rper on j.id_periode = rper.id_periode 
group by rk2.id_kode,rk2.uraian_kode

union

Select
      rk.id_kode as id_kode
      ,rper.periode      
      ,ab.tanggal_aktivasi      
      ,ab.tanggal_finish
      ,rk.uraian_kode  as uraian_kode
      ,j.jumlah as jumlah
      ,j.pusat as pusat
      ,3 as color_id
from
	(select
		  r.id_ref_kode     
      ,rp.id_periode
      ,r.id_anggaran 
		  , sum(r.jumlah) as jumlah
		  , sum(k.saldo) as pusat
	from 
		 kas_umum k     
		 join rapbs_periode rp on k.id_rapbs_periode = rp.id_rapbs_periode     
		 join rapbs r on rp.id_rapbs = r.id_rapbs     
	where k.soft_delete = 0 and rp.soft_delete = 0 and r.soft_delete = 0
  and k.id_anggaran = :id_anggaran and k.tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode) and k.tanggal_transaksi <=(select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)     
	group by r.id_kode
	)j
  join ref_kode rk on j.[id_ref_kode] = rk.id_ref_kode   
  left join (select * from aktivasi_bku where soft_delete = 0) ab on j.id_anggaran = ab.id_anggaran  
  left join (select * from ref_periode) rper on j.id_periode = rper.id_periode 

order by id_kode,color_id