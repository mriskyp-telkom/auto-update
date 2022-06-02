select 
       saldo_awal_bank+saldo_awal_tunai as saldo_bos
       ,case when :id_periode = 1 then 'Semester 1' else 'Semester 2' end as periode       
       ,ifnull((select ifnull(sum(case when id_ref_bku= 2 then saldo else 0 end),0)-ifnull(sum(case when id_ref_bku= 14 then saldo else 0 end),0) as saldo from kas_umum where soft_delete=0 and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end)) and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))),0) as penerimaan       
       ,(       
          select ifnull(sum(saldo),0) as saldo from kas_umum where soft_delete=0 and id_anggaran=:id_anggaran and case when (select id_ref_sumber_dana from anggaran where id_anggaran=:id_anggaran) < 30 then id_ref_bku in (4,15) else id_ref_bku in (24,35) end  
          and tanggal_transaksi>=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end)) and tanggal_transaksi<=(date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end))
         ) as penggunaan 
       ,(select varValue from app_config where varname='tahun_anggaran')tahun_anggaran
from aktivasi_bku ab
where ab.soft_delete=0 and ab.id_anggaran=:id_anggaran and ab.id_periode=case when :id_periode = 1 then 81 else 87 end
