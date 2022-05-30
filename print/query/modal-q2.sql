select 
       k.tanggal_transaksi
       ,substr(r.id_kode,1,3) as kd_pro
       ,substr(r.id_kode,4,3) as kd_sub
       ,substr(r.id_kode,7,3) as kd_keg
       ,k.kode_rekening       
       ,k.no_bukti
       ,k.volume
       ,k.saldo/k.volume as harga_satuan
       ,k.uraian
       ,k.saldo
from kas_umum k
join rapbs_periode rp on k.id_rapbs_periode = rp.id_rapbs_periode
join rapbs r on rp.id_rapbs = r.id_rapbs
join ref_rekening rr on r.kode_rekening = rr.kode_rekening
join ref_kode rk on r.id_kode = rk.id_kode  
where
  rr.bhp = 'RBM'  
  and k.tanggal_transaksi >= :tanggal_start  
  and k.tanggal_transaksi <= :tanggal_end  
  and k.id_anggaran = :id_anggaran  
  and k.soft_delete=0
  and rp.soft_delete=0
  and r.soft_delete=0
order by k.tanggal_transaksi, k.create_date