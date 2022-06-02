SELECT 
       k.tanggal_transaksi
       ,substr(rk.id_kode,1,3) as kd_pro
       ,substr(rk.id_kode,4,3) as kd_sub
       ,substr(rk.id_kode,7,3) as kd_keg
       ,k.kode_rekening       
       ,k.no_bukti
	   ,rb.id_barang
       ,k.volume
       ,CASE WHEN k.volume > 0 THEN  k.saldo/k.volume ELSE 0 END as harga_satuan
       ,k.uraian
       ,k.saldo
from kas_umum k
join rapbs_periode rp on k.id_rapbs_periode = rp.id_rapbs_periode
join rapbs r on rp.id_rapbs = r.id_rapbs
join ref_rekening rr on r.kode_rekening = rr.kode_rekening
join ref_kode rk on r.id_ref_kode = rk.id_ref_kode  
JOIN ref_acuan_barang rb ON rb.id_barang = r.id_barang
where
  trim(rr.bhp) = 'RBHP'  
  and k.tanggal_transaksi >= (select tanggal_aktivasi from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)
  and k.tanggal_transaksi <= (select tanggal_finish from aktivasi_bku where soft_delete=0 and id_anggaran=:id_anggaran and id_periode=:id_periode)
  and k.id_anggaran = :id_anggaran  
  and k.soft_delete=0
order by k.tanggal_transaksi, k.create_date