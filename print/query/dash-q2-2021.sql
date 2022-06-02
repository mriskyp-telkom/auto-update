select 
       'Belanja Barang Pakai Habis' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join (
            select ax.* 
            from anggaran ax 
            join (
                  select id_anggaran, id_ref_sumber_dana,max(is_revisi) as is_revisi 
                  from anggaran 
                  where soft_delete=0 
                  group by id_anggaran,id_ref_sumber_dana
                  ) ax2 
                        on ax.id_ref_sumber_dana = ax2.id_ref_sumber_dana 
                           and ax.is_revisi = ax2.is_revisi
            ) s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0 
            and s.is_revisi = (select max(is_revisi) from anggaran where soft_delete=0 and id_ref_sumber_dana=:id_ref_sumber_dana)     
            and r.kode_rekening like '5.1.02.01%'
      )rpa
union

select 
       'Belanja Barang dan Jasa' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join (select ax.* from anggaran ax join (select id_ref_sumber_dana,max(is_revisi) as is_revisi from anggaran where soft_delete=0 group by id_ref_sumber_dana) ax2 on ax.id_ref_sumber_dana = ax2.id_ref_sumber_dana and ax.is_revisi = ax2.is_revisi) s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0                  
            and s.is_revisi = (select max(is_revisi) from anggaran where soft_delete=0 and id_ref_sumber_dana=:id_ref_sumber_dana)     
            and r.kode_rekening like '5.1.02.%' 
            and r.kode_rekening not like '5.1.02.01%'
            --and r.kode_rekening not in (select kode_rekening from ref_acuan_barang where kode_rekening is not null and expired_date is null and kode_belanja='RBHP')
      )rpa

union

select 
       'Barang Modal' as jenis_belanja, cast(ifnull(rpa.jumlah,0) as money) as jumlah 
from 
     (
      select 
             sum(r.jumlah)jumlah 
      from 
           rapbs r 
      join (select ax.* from anggaran ax join (select id_ref_sumber_dana,max(is_revisi) as is_revisi from anggaran where soft_delete=0 group by id_ref_sumber_dana) ax2 on ax.id_ref_sumber_dana = ax2.id_ref_sumber_dana and ax.is_revisi = ax2.is_revisi) s 
           on r.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0                  
            and s.is_revisi = (select max(is_revisi) from anggaran where soft_delete=0 and id_ref_sumber_dana=:id_ref_sumber_dana)     
            and r.kode_rekening like '5.2%'            
      )rpa
union

select 
       'Belum dianggarkan' as jenis_belanja
       , ar.jumlah - ass.jumlah as sisa
from anggaran ar 
join (
      select 
             id_ref_sumber_dana,max(is_revisi) as is_revisi 
      from anggaran 
      where soft_delete=0 
      group by id_ref_sumber_dana
      ) ax2 on ar.id_ref_sumber_dana = ax2.id_ref_sumber_dana 
          and ar.is_revisi = ax2.is_revisi
left join (
     select 
           sum(a.jumlah) jumlah, a.id_anggaran 
     from rapbs a
     join (
            select ax.* 
            from anggaran ax 
            join (
                  select 
                         id_ref_sumber_dana,max(is_revisi) as is_revisi 
                  from anggaran 
                  where soft_delete=0 
                  group by id_ref_sumber_dana
                  ) ax2 on ax.id_ref_sumber_dana = ax2.id_ref_sumber_dana 
                           and ax.is_revisi = ax2.is_revisi
            ) s 
           on a.id_anggaran = s.id_anggaran
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and a.soft_delete = 0      
            and s.soft_delete = 0                  
            and s.is_revisi = (select max(is_revisi) from anggaran where soft_delete=0 and id_ref_sumber_dana=:id_ref_sumber_dana)     
           group by a.id_anggaran
           ) ass on ar.id_anggaran = ass.id_anggaran           
where ar.soft_delete = 0 and (ar.jumlah - ass.jumlah) is not null