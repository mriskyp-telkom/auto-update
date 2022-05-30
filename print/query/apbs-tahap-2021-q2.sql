select 
       case when rs.kode = '4.3.1.33.' then '4.3.1.00.' when rs.kode = '4.3.1.05.' then '4.3.1.99.' else rs.kode end || 
       case when substr(case when rs.kode = '4.3.1.33.' then '4.3.1.00.' else rs.kode end,length(case when rs.kode = '4.3.1.33.' then '4.3.1.00.' else rs.kode end),1) <> '.' then '.'  else '' end  
       as kode
       , rs.nama_sumber_dana as nama_sumber_dana
       ,ifnull(s.jumlah,0) as jumlah
       from ref_sumber_dana rs   
       join (select * from anggaran where id_anggaran=:id_anggaran and soft_delete=0) s on s.id_ref_sumber_dana = rs.id_ref_sumber_dana
 
