select 
       case when rs.kode = '4.3.1.33.' then '4.3.1.00.' when rs.kode = '4.3.1.05.' then '4.3.1.99.' else rs.kode end || 
       case when substr(case when rs.kode = '4.3.1.33.' then '4.3.1.00.' else rs.kode end,length(case when rs.kode = '4.3.1.33.' then '4.3.1.00.' else rs.kode end),1) <> '.' then '.'  else '' end  
       as kode
       , rs.nama_sumber_dana as nama_sumber_dana
       ,ifnull(s.jumlah,0) as jumlah       
       ,case when s.id_ref_sumber_dana is null then '**' when s.tanggal_pengesahan is null then '*' else '' end as status_anggaran       
       ,case when s.jumlah <> ifnull(r.jumlah,0) then '~' else '' end as status_belanja
       from ref_sumber_dana rs   
       left join (select * from anggaran where id_anggaran in (:id_anggaran1,:id_anggaran2,:id_anggaran3,:id_anggaran4) and soft_delete=0) s on s.id_ref_sumber_dana = rs.id_ref_sumber_dana
       left join (select id_anggaran,sum(jumlah)jumlah from rapbs r where soft_delete = 0 group by id_anggaran) r on s.id_anggaran = r.id_anggaran
where rs.kode > 0
and rs.id_ref_sumber_dana not in (2,4,99) 
order by kode


