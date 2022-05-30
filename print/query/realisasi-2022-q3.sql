select 1 as code_header,'Belanja Barang dan Jasa' as rekening, '5.1.' as kode_rekening, 'a. Belanja Operasional' as sumber_dana, null as jumlah, null as realisasi_nm1, null as realisasi_n, null as total_realisasi, null as selisih
union all
select 
  3 as code_header
  ,x1.*  
  ,'    :: '||x2.sumber_dana  
  ,x2.jumlah  
  ,x2.realisasi_nm1  
  ,x2.realisasi_n  
  ,x2.total_realisasi  
  ,x2.selisih
from (
    select 'Belanja Barang dan Jasa' as rekening, '5.1.02.' as kode_rekening
  )x1
  left join (
  select   
    r.nama_sumber_dana as sumber_dana
    ,b.rekening as kode_rekening
    ,b.jumlah as jumlah
    ,ifnull(c.realisasi_nm1,0) as realisasi_nm1    
    ,ifnull(c.realisasi_n,0) as realisasi_n    
    ,ifnull(c.total_realisasi,0) as total_realisasi    
    ,b.jumlah - ifnull(c.total_realisasi,0) as selisih
  from (      
    select 
      a3.* 
    from 
      anggaran a3 
      join (
        select 
          ax2.id_ref_sumber_dana
          ,ax2.is_revisi
          ,max(ax1.tanggal_pengesahan) as tanggal_pengesahan 
        from 
          anggaran ax1 
          join (
            select 
              ax.id_ref_sumber_dana
              ,max(ax.is_revisi)is_revisi 
            from 
              anggaran ax 
            where 
              ax.soft_delete = 0 
              and ax.is_aktif=1 
              and ax.tanggal_pengajuan is not null 
              and ax.tanggal_pengesahan is not null 
              and (ax.alasan_penolakan is null or ax.alasan_penolakan = '') 
            group by 
              ax.id_ref_sumber_dana
          )ax2 
            on ax1.id_ref_sumber_dana = ax2.id_ref_sumber_dana 
              and ax1.is_revisi = ax2.is_revisi  
          group by ax2.id_ref_sumber_dana,ax2.is_revisi                 
      )a2               
        on a3.id_ref_sumber_dana = a2.id_ref_sumber_dana 
          and a3.is_revisi = a2.is_revisi
          and a3.tanggal_pengesahan = a2.tanggal_pengesahan 
    )a    
    join ref_sumber_dana r    
      on a.id_ref_sumber_dana = r.id_ref_sumber_dana
    join (
      select 
        r.id_anggaran        
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end as rekening
        ,sum(rp.jumlah) as jumlah
      from 
        rapbs_periode rp
        join rapbs r
          on rp.id_rapbs = r.id_rapbs
      where
        rp.soft_delete=0
        and r.soft_delete=0
      group by 
        r.id_anggaran
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end  
    )b
      on a.id_anggaran = b.id_anggaran 
    left join (    
      select 
        k.id_anggaran        
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end as rekening
        ,sum(
          case 
            when :id_periode=1 then 0
            when :id_periode=2 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-30') then k.saldo      
            else 0            
          end
        ) as realisasi_nm1
        ,sum(
          case 
            when :id_periode=1 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-06-30') then k.saldo
            when :id_periode=2 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-12-31') then k.saldo      
            else 0            
          end
        ) as realisasi_n
        ,sum(k.saldo) as total_realisasi

      from 
        kas_umum k
        join rapbs_periode rp
          on k.id_rapbs_periode = rp.id_rapbs_periode
        join rapbs r
          on rp.id_rapbs = r.id_rapbs
      where
        k.id_ref_bku in (4,15,24,35)
        and k.soft_delete=0
        and rp.soft_delete=0
        and r.soft_delete=0
      group by 
        k.id_anggaran
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end  
    )c    
      on a.id_anggaran = c.id_anggaran and b.rekening = c.rekening            
  )x2  
    on x1.kode_rekening = x2.kode_rekening

union all

select 1 as code_header,'Belanja Modal' as rekening, '5.2.' as kode_rekening, 'b. Belanja Modal' as sumber_dana, null as jumlah, null as realisasi_nm1, null as realisasi_n, null as total_realisasi, null as selisih

union all

select 2 as code_header,'Belanja Modal Peralatan dan Mesin' as rekening, '5.2.' as kode_rekening, '  1) Belanja Modal Peralatan dan Mesin' as sumber_dana, null as jumlah, null as realisasi_nm1, null as realisasi_n, null as total_realisasi, null as selisih

union all

select 
  3 as code_header
  ,x1.*  
  ,'      :: '||x2.sumber_dana  
  ,x2.jumlah  
  ,x2.realisasi_nm1  
  ,x2.realisasi_n  
  ,x2.total_realisasi  
  ,x2.selisih
from (
    select 'Belanja Modal Peralatan dan Mesin' as rekening, '5.2.02.' as kode_rekening
  )x1
  left join (
  select   
    r.nama_sumber_dana as sumber_dana
    ,b.rekening as kode_rekening
    ,b.jumlah as jumlah
    ,ifnull(c.realisasi_nm1,0) as realisasi_nm1    
    ,ifnull(c.realisasi_n,0) as realisasi_n    
    ,ifnull(c.total_realisasi,0) as total_realisasi    
    ,b.jumlah - ifnull(c.total_realisasi,0) as selisih
  from (      
    select 
      a3.* 
    from 
      anggaran a3 
      join (
        select 
          ax2.id_ref_sumber_dana
          ,ax2.is_revisi
          ,max(ax1.tanggal_pengesahan) as tanggal_pengesahan 
        from 
          anggaran ax1 
          join (
            select 
              ax.id_ref_sumber_dana
              ,max(ax.is_revisi)is_revisi 
            from 
              anggaran ax 
            where 
              ax.soft_delete = 0 
              and ax.is_aktif=1 
              and ax.tanggal_pengajuan is not null 
              and ax.tanggal_pengesahan is not null 
              and (ax.alasan_penolakan is null or ax.alasan_penolakan = '') 
            group by 
              ax.id_ref_sumber_dana
          )ax2 
            on ax1.id_ref_sumber_dana = ax2.id_ref_sumber_dana 
              and ax1.is_revisi = ax2.is_revisi  
          group by ax2.id_ref_sumber_dana,ax2.is_revisi                 
      )a2               
        on a3.id_ref_sumber_dana = a2.id_ref_sumber_dana 
          and a3.is_revisi = a2.is_revisi
          and a3.tanggal_pengesahan = a2.tanggal_pengesahan 
    )a    
    join ref_sumber_dana r    
      on a.id_ref_sumber_dana = r.id_ref_sumber_dana
    join (
      select 
        r.id_anggaran        
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end as rekening
        ,sum(rp.jumlah) as jumlah
      from 
        rapbs_periode rp
        join rapbs r
          on rp.id_rapbs = r.id_rapbs
      where
        rp.soft_delete=0
        and r.soft_delete=0
      group by 
        r.id_anggaran
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end  
    )b
      on a.id_anggaran = b.id_anggaran 
    left join (    
      select 
        k.id_anggaran        
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end as rekening
        ,sum(
          case 
            when :id_periode=1 then 0
            when :id_periode=2 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-30') then k.saldo      
            else 0            
          end
        ) as realisasi_nm1
        ,sum(
          case 
            when :id_periode=1 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-06-30') then k.saldo
            when :id_periode=2 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-12-31') then k.saldo      
            else 0            
          end
        ) as realisasi_n
        ,sum(k.saldo) as total_realisasi

      from 
        kas_umum k
        join rapbs_periode rp
          on k.id_rapbs_periode = rp.id_rapbs_periode
        join rapbs r
          on rp.id_rapbs = r.id_rapbs
      where
        k.id_ref_bku in (4,15,24,35)
        and k.soft_delete=0
        and rp.soft_delete=0
        and r.soft_delete=0
      group by 
        k.id_anggaran
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end  
    )c    
      on a.id_anggaran = c.id_anggaran and b.rekening = c.rekening            
  )x2  
    on x1.kode_rekening = x2.kode_rekening

union all

select 2 as code_header,'Belanja Modal Aset Tetap Lainnya' as rekening, '5.2.05.' as kode_rekening, '  2) Belanja Modal Aset Tetap Lainnya' as sumber_dana, null as jumlah, null as realisasi_nm1, null as realisasi_n, null as total_realisasi, null as selisih

union all

select 
  3 as code_header
  ,x1.*  
  ,'      :: '||x2.sumber_dana  
  ,x2.jumlah  
  ,x2.realisasi_nm1  
  ,x2.realisasi_n  
  ,x2.total_realisasi  
  ,x2.selisih
from (
    select 'Belanja Modal Aset Tetap Lainnya' as rekening, '5.2.05.' as kode_rekening
  )x1
  left join (
  select   
    r.nama_sumber_dana as sumber_dana
    ,b.rekening as kode_rekening
    ,b.jumlah as jumlah
    ,ifnull(c.realisasi_nm1,0) as realisasi_nm1    
    ,ifnull(c.realisasi_n,0) as realisasi_n    
    ,ifnull(c.total_realisasi,0) as total_realisasi    
    ,b.jumlah - ifnull(c.total_realisasi,0) as selisih
  from (      
    select 
      a3.* 
    from 
      anggaran a3 
      join (
        select 
          ax2.id_ref_sumber_dana
          ,ax2.is_revisi
          ,max(ax1.tanggal_pengesahan) as tanggal_pengesahan 
        from 
          anggaran ax1 
          join (
            select 
              ax.id_ref_sumber_dana
              ,max(ax.is_revisi)is_revisi 
            from 
              anggaran ax 
            where 
              ax.soft_delete = 0 
              and ax.is_aktif=1 
              and ax.tanggal_pengajuan is not null 
              and ax.tanggal_pengesahan is not null 
              and (ax.alasan_penolakan is null or ax.alasan_penolakan = '') 
            group by 
              ax.id_ref_sumber_dana
          )ax2 
            on ax1.id_ref_sumber_dana = ax2.id_ref_sumber_dana 
              and ax1.is_revisi = ax2.is_revisi  
          group by ax2.id_ref_sumber_dana,ax2.is_revisi                 
      )a2               
        on a3.id_ref_sumber_dana = a2.id_ref_sumber_dana 
          and a3.is_revisi = a2.is_revisi
          and a3.tanggal_pengesahan = a2.tanggal_pengesahan 
    )a    
    join ref_sumber_dana r    
      on a.id_ref_sumber_dana = r.id_ref_sumber_dana
    join (
      select 
        r.id_anggaran        
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end as rekening
        ,sum(rp.jumlah) as jumlah
      from 
        rapbs_periode rp
        join rapbs r
          on rp.id_rapbs = r.id_rapbs
      where
        rp.soft_delete=0
        and r.soft_delete=0
      group by 
        r.id_anggaran
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end  
    )b
      on a.id_anggaran = b.id_anggaran 
    left join (    
      select 
        k.id_anggaran        
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end as rekening
        ,sum(
          case 
            when :id_periode=1 then 0
            when :id_periode=2 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-30') then k.saldo      
            else 0            
          end
        ) as realisasi_nm1
        ,sum(
          case 
            when :id_periode=1 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-06-30') then k.saldo
            when :id_periode=2 and k.tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-01') and k.tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-12-31') then k.saldo      
            else 0            
          end
        ) as realisasi_n
        ,sum(k.saldo) as total_realisasi

      from 
        kas_umum k
        join rapbs_periode rp
          on k.id_rapbs_periode = rp.id_rapbs_periode
        join rapbs r
          on rp.id_rapbs = r.id_rapbs
      where
        k.id_ref_bku in (4,15,24,35)
        and k.soft_delete=0
        and rp.soft_delete=0
        and r.soft_delete=0
      group by 
        k.id_anggaran
        ,case when substr(r.kode_rekening,1,7) = '5.2.04.' then '5.2.05.' else substr(r.kode_rekening,1,7) end  
    )c    
      on a.id_anggaran = c.id_anggaran and b.rekening = c.rekening            
  )x2  
    on x1.kode_rekening = x2.kode_rekening





