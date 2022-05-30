Select 
       '4.3.4.1.1' as kode_rekening,
       case when (aa.no_data=1) then       
            (select jumlah from anggaran where soft_delete= 0 and id_ref_sumber_dana=1)
       else       
            0
       End as pagu,       
       case when aa.semester_lalu>0 then aa.semester_lalu else 0 End as semester_lalu,
       aa.semester_ini,
       aa.total_semester_ini,   
       ((select jumlah from anggaran where soft_delete= 0 and id_ref_sumber_dana=1)-aa.total_semester_ini ) as sisa 
From
(Select 
(select count(*) from kas_umum b  where a.tanggal_transaksi >= b.tanggal_transaksi and b.soft_delete= 0 and b.id_ref_bku=2) as no_data,
(select SUM(saldo) from kas_umum c  where c.tanggal_transaksi < a.tanggal_transaksi and c.soft_delete= 0 and c.id_ref_bku=2) as semester_lalu,
a.saldo as semester_ini,
(select SUM(saldo) from kas_umum d  where d.tanggal_transaksi <= a.tanggal_transaksi and d.soft_delete= 0 and d.id_ref_bku=2) as total_semester_ini
from 
     kas_umum a
where a.soft_delete= 0 and a.id_ref_bku=2 and a.id_anggaran=:id_anggaran) aa