select rx.id_kode,rx.uraian_kode,rx2.v1,rx2.v2,rx2.v3,rx2.v4,rx2.v5,rx2.v6,rx2.v7,rx2.v8,rx2.v9,rx2.v10,rx2.v11 from ref_kode rx join 
(
select x.id_ref_kode
,sum(v1)v1
,sum(v2)v2
,sum(v3)v3
,sum(v4)v4
,sum(v5)v5
,sum(v6)v6
,sum(v7)v7
,sum(v8)v8
,sum(v9)v9
,sum(v10)v10
,sum(v11)v11
from 
(
	select 
		r.id_ref_kode
    ,r2.uraian_kode
	,case when r2.uraian_kode='Pengembangan Perpustakaan' then sum(ifnull(k3.jumlah,0)) else 0 end as v1
	,case when r2.uraian_kode='Kegiatan Penerimaan Peserta Didik Baru' then sum(ifnull(k3.jumlah,0)) else 0 end as v2
	,case when r2.uraian_kode='Kegiatan Pembelajaran dan Ekstrakurikuler' then sum(ifnull(k3.jumlah,0)) else 0 end as v3
	,case when r2.uraian_kode='Kegiatan Evaluasi Pembelajaran dan Ekstrakurikuler' then sum(ifnull(k3.jumlah,0)) else 0 end as v4
	,case when r2.uraian_kode='Pembiayaan Pengelolaan Sekolah' then sum(ifnull(k3.jumlah,0)) else 0 end as v5
	,case when r2.uraian_kode='Pengembangan Profesi Guru dan Tenaga Kependidikan' then sum(ifnull(k3.jumlah,0)) else 0 end as v6
	,case when r2.uraian_kode='Langganan Daya dan Jasa' then sum(ifnull(k3.jumlah,0)) else 0 end as v7
	,case when r2.uraian_kode='Pemeliharaan dan Perawatan Sarana dan Prasarana Sekolah' then sum(ifnull(k3.jumlah,0)) else 0 end as v8
	,case when r2.uraian_kode='Pembayaran Honor' then sum(ifnull(k3.jumlah,0)) else 0 end as v9
	,case when r2.uraian_kode='Pembelian dan Perawatan Alat Multi Media Pembelajaran' then sum(ifnull(k3.jumlah,0)) else 0 end as v10
	,case when r2.uraian_kode='Biaya Lainnya' then sum(ifnull(k3.jumlah,0)) else 0 end as v11
	from 
		ref_kode r
		join ref_kode r2 on r2.parent_kode = r.id_ref_kode
    left join (    
				select 
					   r2.id_ref_kode,sum(k2.jum) as jumlah
				from 
					 ref_kode r
					 join ref_kode r2 on r.parent_kode = r2.id_ref_kode     
					 join (
							select 
								 r.id_ref_kode     
								 ,sum(k.saldo) as jum
							from 
								 kas_umum k 
								 join rapbs_periode rp on k.id_rapbs_periode = rp.id_rapbs_periode     
								 join rapbs r on rp.id_rapbs = r.id_rapbs
							where
								 k.soft_delete =  0     
								 and rp.soft_delete = 0     
								 and r.soft_delete = 0 
								 and r.keterangan<>'sisa'
								 and k.id_anggaran=:id_anggaran 
								 and k.tanggal_transaksi >= :tanggal_start
								 and k.tanggal_transaksi <= :tanggal_end 
								 and k.id_ref_bku in (4,15)
							group by 
								  r.id_ref_kode    
					  )k2 on r.id_ref_kode = k2.id_ref_kode     
					 --join (select dm.bentuk_pendidikan_id as bentuk_pendidikan_id from anggaran da join mst_sekolah dm on da.sekolah_id = dm.sekolah_id where da.id_anggaran=:id_anggaran) bp on r.bentuk_pendidikan_id = bp.bentuk_pendidikan_id
				where r.bentuk_pendidikan_id = (select dm.bentuk_pendidikan_id as bentuk_pendidikan_id from anggaran da join mst_sekolah dm on da.sekolah_id = dm.sekolah_id where da.id_anggaran=:id_anggaran)
				group by r2.id_ref_kode
    )k3 on r2.id_ref_kode = k3.id_ref_kode
	where r.expired_date is null and r2.expired_date is null and r.id_level_kode=1 
	and r.bentuk_pendidikan_id = (select dm.bentuk_pendidikan_id as bentuk_pendidikan_id from anggaran da join mst_sekolah dm on da.sekolah_id = dm.sekolah_id where da.id_anggaran=:id_anggaran)
	group by r.id_kode,r2.uraian_kode
	--order by id_kode
)x
group by x.id_ref_kode
)rx2 on rx.id_ref_kode = rx2.id_ref_kode
order by rx.id_kode
