select rx.id_kode,rx.uraian_kode as uraian_kode,rx2.v1,rx2.v2,rx2.v3,rx2.v4,rx2.v5,rx2.v6,rx2.v7,rx2.v8,rx2.v9,rx2.v10,rx2.v11,rx2.v12 from ref_kode rx join 
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
,sum(v12)v12
from 
(
	select 
		r.id_ref_kode
    ,r2.uraian_kode
    ,case when r2.uraian_kode='Pembiayaan Penerimaan Peserta Didik Baru' then sum(ifnull(k3.jumlah,0)) else 0 end as v1
    ,case when r2.uraian_kode='Pembiayaan Pengembangan Perpustakaan' then sum(ifnull(k3.jumlah,0)) else 0 end as v2
    ,case when r2.uraian_kode='Pembiayaan Kegiatan Pembelajaran dan Ekstrakurikuler' then sum(ifnull(k3.jumlah,0)) else 0 end as v3
    ,case when r2.uraian_kode='Kegiatan Pembiayaan Asesmen/Evaluasi Pembelajaran dan Ekstrakurikuler' then sum(ifnull(k3.jumlah,0)) else 0 end as v4
    ,case when r2.uraian_kode='Pembiayaan Administrasi Kegiatan Sekolah' then sum(ifnull(k3.jumlah,0)) else 0 end as v5
    ,case when r2.uraian_kode='Pembiayaan Pengembangan Profesi Guru dan Tenaga Kependidikan' then sum(ifnull(k3.jumlah,0)) else 0 end as v6
    ,case when r2.uraian_kode='Pembiayaan Langganan Daya dan/atau Jasa' then sum(ifnull(k3.jumlah,0)) else 0 end as v7
    ,case when r2.uraian_kode='Pembiayaan Pemeliharaan Sarana dan Prasarana Sekolah' then sum(ifnull(k3.jumlah,0)) else 0 end as v8
    ,case when r2.uraian_kode='Penyediaan Alat Multi Media Pembelajaran' then sum(ifnull(k3.jumlah,0)) else 0 end as v9
    ,case when r2.uraian_kode='Pembiayaan Penyelenggaraan Bursa Kerja Khusus,Praktik Kerja Industri atau Praktik Kerja Lapangan di Dalam Negeri, Pemantauan Kebekerjaan, Pemagangan Guru, dan Lembaga Sertifikasi Profesi Pihak Pertama' then sum(ifnull(k3.jumlah,0)) else 0 end as v10
    ,case when r2.uraian_kode='Pembiayaan Penyelenggaraan Kegiatan Uji Komp Keahlian, Sertifikasi Kompetensi Keahlian,dan Uji Komp Kemampuan Bhs Inggris Berstandar Internasional dan Bhs Asing Lainnya bagi Kelas Akhir SMK atau SMALB' then sum(ifnull(k3.jumlah,0)) else 0 end as v11
    ,case when r2.uraian_kode='Pembiayaan untuk Pembayaran Honor' then sum(ifnull(k3.jumlah,0)) else 0 end as v12
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
								 and k.id_anggaran=:id_anggaran 
								 and k.tanggal_transaksi >= (date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' else (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' end))
								 and k.tanggal_transaksi <= (date(case when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' else (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' end)) 
								 and case when (select id_ref_sumber_dana from anggaran where id_anggaran=:id_anggaran) < 30 then k.id_ref_bku in (4,15) else k.id_ref_bku in (24,35) end 
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
