select 
       'Triwulan '||rpp.id_periode as triwulan,cast(ifnull(rpa.jumlah,0) as money) as jumlah
from 
     ref_periode rpp  
     left join (
      select 
             rp.id_periode,sum(rp.jumlah)jumlah 
      from 
           rapbs r 
      join (select ax.* from anggaran ax join (select id_ref_sumber_dana,max(is_revisi) as is_revisi from anggaran where soft_delete=0 group by id_ref_sumber_dana) ax2 on ax.id_ref_sumber_dana = ax2.id_ref_sumber_dana and ax.is_revisi = ax2.is_revisi) s 
           on r.id_anggaran = s.id_anggaran
      join rapbs_periode rp
           on r.id_rapbs = rp.id_rapbs 
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and rp.soft_delete = 0 
      group by 
            rp.id_periode            
      )rpa      
      on rpp.id_periode = rpa.id_periode

where rpp.id_periode < 80
