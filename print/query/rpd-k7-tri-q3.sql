select 
    rk.id_kode as id_kode        
    ,case when substr(rk.id_kode,4,3) = '' then substr(rk.id_kode,2,1) else '' end as no_urut    
    ,substr(rk.id_kode,1,3) as kode1    
    ,substr(rk.id_kode,4,3) as kode2    
    ,substr(rk.id_kode,7,3) as kode3    
    ,rk.uraian_kode as uraian_kode    
    ,x.saldo_bos as saldo_bos    
    ,x.saldo_bosda as saldo_bosda    
    ,x.saldo_lainnya as saldo_lainnya    
    ,x.saldo_bos+x.saldo_bosda+x.saldo_lainnya as saldo
    ,x.color_id as color_id
from 
     ref_kode rk 
     join (
			select 
				substr(r.id_kode,1,3) as id_kode    
				,sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) saldo_bos     
				,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) saldo_bosda 
				,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) saldo_lainnya     
				,1 as color_id
			from 
				kas_umum k 
				join rapbs_periode rp     
					on k.id_rapbs_periode = rp.id_rapbs_periode          
				join rapbs r     
					on rp.id_rapbs = r.id_rapbs       
				join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a
					on r.id_anggaran = a.id_anggaran
			where       
				k.soft_delete = 0 and rp.soft_delete=0 and r.soft_delete=0 and a.soft_delete=0
				and k.tanggal_transaksi >= :tanggal_start and k.tanggal_transaksi <= :tanggal_end
			group by 
				substr(r.id_kode,1,3)
		union
			select 
				 substr(r.id_kode,1,6) as id_kode    
				 ,sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) saldo_bos     
				 ,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) saldo_bosda 
				 ,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) saldo_lainnya     
				 ,2 as color_id
			from 
				kas_umum k 
				join rapbs_periode rp     
					on k.id_rapbs_periode = rp.id_rapbs_periode          
				join rapbs r     
					on rp.id_rapbs = r.id_rapbs       
				join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a
					on r.id_anggaran = a.id_anggaran
			where       
				k.soft_delete = 0 and rp.soft_delete=0 and r.soft_delete=0 and a.soft_delete=0
				and k.tanggal_transaksi >= :tanggal_start and k.tanggal_transaksi <= :tanggal_end
			group by 
				  substr(r.id_kode,1,6)
		union
			select 
				 r.id_kode    
				 ,sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) saldo_bos     
				 ,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) saldo_bosda 
				 ,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) saldo_lainnya     
				 ,3 as color_id
			from 
				kas_umum k 
				join rapbs_periode rp     
					on k.id_rapbs_periode = rp.id_rapbs_periode          
				join rapbs r     
					on rp.id_rapbs = r.id_rapbs       
				join (
				   select 
						a.* 
				   from 
						anggaran a 
						join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
							 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
				) a
					on r.id_anggaran = a.id_anggaran            
			where       
				k.soft_delete = 0 and rp.soft_delete=0 and r.soft_delete=0 and a.soft_delete=0
				and k.tanggal_transaksi >= :tanggal_start and k.tanggal_transaksi <= :tanggal_end
			group by 
				  r.id_kode      
	)x
		on rk.id_kode = x.id_kode     
where 
      :id_anggaran=:id_anggaran and :id_periode=:id_periode            
union 
select 
	'9.0.0' as id_kode        
	,'9' as no_urut    
	,null as kode1    
	,null as kode2    
	,null as kode3    
	,'Administrasi Bank' as uraian_kode    
	,sum(case when a.id_ref_sumber_dana = 1 then k.saldo else 0 end) saldo_bos     
	,sum(case when a.id_ref_sumber_dana in (2,3) then k.saldo else 0 end) saldo_bosda 
	,sum(case when a.id_ref_sumber_dana in (4,5) then k.saldo else 0 end) saldo_lainnya     
	,sum(k.saldo) saldo
	,1 as color_id
from
	kas_umum k
	join (
       select 
            a.* 
       from 
            anggaran a 
            join (select id_ref_sumber_dana,max(is_revisi)is_revisi,max(last_update)last_update from anggaran where soft_delete=0 group by id_ref_sumber_dana)aa     
                 on a.id_ref_sumber_dana = aa.id_ref_sumber_dana and a.is_revisi = aa.is_revisi and a.last_update = aa.last_update
   ) a 
		on k.id_anggaran = k.id_anggaran  
where
	k.id_ref_bku in (7,27)  
	and k.soft_delete = 0 and a.soft_delete = 0
	and k.tanggal_transaksi >= :tanggal_start and k.tanggal_transaksi <= :tanggal_end
group by 
	k.id_ref_bku  

order by id_kode