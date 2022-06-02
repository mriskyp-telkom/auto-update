select 
    r.nama_sumber_dana as sumber_dana
    ,a.jumlah as jumlah
    ,ifnull(b.realisasi_nm1,0) as realisasi_nm1
    ,ifnull(b.realisasi_n,0) as realisasi_n
    ,ifnull(b.total_realisasi,0) as total_realisasi  
    ,a.jumlah - ifnull(b.total_realisasi,0) as selisih  
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
    left join (  
      select 
        id_anggaran
        ,sum(
          case 
            when :id_periode=1 then 0
            when :id_periode=2 and tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-30') then saldo      
            else 0            
          end
        ) as realisasi_nm1
        ,sum(
          case 
            when :id_periode=1 and tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-01-01') and tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-06-30') then saldo
            when :id_periode=2 and tanggal_transaksi >=  date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-07-01') and tanggal_transaksi <= date(substr(cast(datetime('now','localtime') as varchar),1,4)||'-12-31') then saldo      
            else 0            
          end
        ) as realisasi_n
        ,sum(saldo) as total_realisasi
      from 
        kas_umum 
      where 
        id_ref_bku=2 
        and soft_delete=0 
      group by 
        id_anggaran
    )b  
      on a.id_anggaran = b.id_anggaran

