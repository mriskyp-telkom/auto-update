select 
       'Triwulan '||rpp.id_periode as triwulan,cast(ifnull(rpa.jumlah,0) as money) as jumlah,cast(ifnull(rpa2.jumlah,0) as money) as jumlah_sisa
from 
     ref_periode rpp  
     left join (
      select 
             rp.id_periode,sum(rp.jumlah)jumlah 
      from 
           rapbs r 
      join anggaran s 
           on r.id_anggaran = s.id_anggaran
      join rapbs_periode rp
           on r.id_rapbs = rp.id_rapbs 
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and rp.soft_delete = 0 
            and (r.keterangan is null or substr(r.keterangan,1,4) <> 'sisa')
      group by 
            rp.id_periode            
      )rpa      
      on rpp.id_periode = rpa.id_periode

     left join (
      select 
             rp.id_periode,sum(rp.jumlah)jumlah 
      from 
           rapbs r 
      join anggaran s 
           on r.id_anggaran = s.id_anggaran
      join rapbs_periode rp
           on r.id_rapbs = rp.id_rapbs 
      where 
            s.id_ref_sumber_dana = :id_ref_sumber_dana      
            and r.soft_delete = 0      
            and s.soft_delete = 0      
            and rp.soft_delete = 0 
            and (substr(r.keterangan,1,4) = 'sisa')
      group by 
            rp.id_periode            
      )rpa2      
      on rpp.id_periode = rpa2.id_periode
where rpp.id_periode < 80
