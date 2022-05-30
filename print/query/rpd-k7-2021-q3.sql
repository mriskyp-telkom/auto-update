select 
	saldo_awal_bank+saldo_awal_tunai as saldo_bos
	,case 
		when :id_periode = 1 then 'Semester 1' 
		when :id_periode = 2 then 'Semester 2' 
		when :id_periode = 11 then 'Tahap 1' 
		when :id_periode = 12 then 'Tahap 2' 
		when :id_periode = 13 then 'Tahap 3' 
    when :id_periode = 81 then 'Januari'  
    when :id_periode = 82 then 'Februari'  
    when :id_periode = 83 then 'Maret'  
    when :id_periode = 84 then 'April'  
    when :id_periode = 85 then 'Mei'  
    when :id_periode = 86 then 'Juni'  
    when :id_periode = 87 then 'Juli'  
    when :id_periode = 88 then 'Agustus'  
    when :id_periode = 89 then 'September'  
    when :id_periode = 90 then 'Oktober'  
    when :id_periode = 91 then 'November'  
    when :id_periode = 92 then 'Desember'  
 	end as periode       
	,ifnull(
		(select 
			ifnull(sum(case when id_ref_bku= 2 then saldo else 0 end),0)-ifnull(sum(case when id_ref_bku= 14 then saldo else 0 end),0) as saldo 
		from 
			kas_umum 
		where 
			soft_delete=0 
			and id_anggaran=:id_anggaran 
			and tanggal_transaksi>=(date(
				case 
					when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' 
					when :id_periode = 2 then (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' 
					when :id_periode = 11 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' 
					when :id_periode = 12 then (select varvalue from app_config where varname='tahun_anggaran')||'-04-01' 
					when :id_periode = 13 then (select varvalue from app_config where varname='tahun_anggaran')||'-09-01' 
                    when :id_periode > 80 and :id_periode < 90 then (select varvalue from app_config where varname='tahun_anggaran')||'-0' || cast(:id_periode-80 as varchar) ||'-01' 
                    when :id_periode > 90 then (select varvalue from app_config where varname='tahun_anggaran')||'-' || cast(:id_periode-80 as varchar) ||'-01' 
				end)) 
			and tanggal_transaksi<=(date(
				case 
					when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' 
					when :id_periode = 2 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
					when :id_periode = 11 then (select varvalue from app_config where varname='tahun_anggaran')||'-03-31' 
					when :id_periode = 12 then (select varvalue from app_config where varname='tahun_anggaran')||'-08-31' 
					when :id_periode = 13 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
                    when :id_periode = 81 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-31' 
                    when :id_periode = 82 then (select varvalue from app_config where varname='tahun_anggaran')||'-02-28' 
                    when :id_periode = 83 then (select varvalue from app_config where varname='tahun_anggaran')||'-03-31' 
                    when :id_periode = 84 then (select varvalue from app_config where varname='tahun_anggaran')||'-04-30' 
                    when :id_periode = 85 then (select varvalue from app_config where varname='tahun_anggaran')||'-05-31' 
                    when :id_periode = 86 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' 
                    when :id_periode = 87 then (select varvalue from app_config where varname='tahun_anggaran')||'-07-31' 
                    when :id_periode = 88 then (select varvalue from app_config where varname='tahun_anggaran')||'-08-31' 
                    when :id_periode = 89 then (select varvalue from app_config where varname='tahun_anggaran')||'-09-30' 
                    when :id_periode = 90 then (select varvalue from app_config where varname='tahun_anggaran')||'-10-31' 
                    when :id_periode = 91 then (select varvalue from app_config where varname='tahun_anggaran')||'-11-30' 
                    when :id_periode = 92 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
				end)))
	,0) as penerimaan       
	,(       
		select 
			ifnull(sum(saldo),0) as saldo 
		from 
			kas_umum k
			join rapbs_periode rp 
				ON k.id_rapbs_periode = rp.id_rapbs_periode     
			join rapbs r 
				ON rp.id_rapbs = r.id_rapbs
		where 
			k.soft_delete=0 
			and rp.soft_delete=0
			and r.soft_delete=0
			and k.id_anggaran=:id_anggaran 
			and case when (select id_ref_sumber_dana from anggaran where id_anggaran=:id_anggaran) < 30 then k.id_ref_bku in (4,15) else k.id_ref_bku in (24,35) end  
			and k.tanggal_transaksi>=(date(
				case 
					when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' 
					when :id_periode = 2 then (select varvalue from app_config where varname='tahun_anggaran')||'-07-01' 
					when :id_periode = 11 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-01' 
					when :id_periode = 12 then (select varvalue from app_config where varname='tahun_anggaran')||'-04-01' 
					when :id_periode = 13 then (select varvalue from app_config where varname='tahun_anggaran')||'-09-01' 
                    when :id_periode > 80 and :id_periode < 90 then (select varvalue from app_config where varname='tahun_anggaran')||'-0' || cast(:id_periode-80 as varchar) ||'-01' 
                    when :id_periode > 90 then (select varvalue from app_config where varname='tahun_anggaran')||'-' || cast(:id_periode-80 as varchar) ||'-01' 
				end)) 
			and k.tanggal_transaksi<=(date(
				case 
					when :id_periode = 1 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' 
					when :id_periode = 2 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
					when :id_periode = 11 then (select varvalue from app_config where varname='tahun_anggaran')||'-03-31' 
					when :id_periode = 12 then (select varvalue from app_config where varname='tahun_anggaran')||'-08-31' 
					when :id_periode = 13 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
                    when :id_periode = 81 then (select varvalue from app_config where varname='tahun_anggaran')||'-01-31' 
                    when :id_periode = 82 then (select varvalue from app_config where varname='tahun_anggaran')||'-02-28' 
                    when :id_periode = 83 then (select varvalue from app_config where varname='tahun_anggaran')||'-03-31' 
                    when :id_periode = 84 then (select varvalue from app_config where varname='tahun_anggaran')||'-04-30' 
                    when :id_periode = 85 then (select varvalue from app_config where varname='tahun_anggaran')||'-05-31' 
                    when :id_periode = 86 then (select varvalue from app_config where varname='tahun_anggaran')||'-06-30' 
                    when :id_periode = 87 then (select varvalue from app_config where varname='tahun_anggaran')||'-07-31' 
                    when :id_periode = 88 then (select varvalue from app_config where varname='tahun_anggaran')||'-08-31' 
                    when :id_periode = 89 then (select varvalue from app_config where varname='tahun_anggaran')||'-09-30' 
                    when :id_periode = 90 then (select varvalue from app_config where varname='tahun_anggaran')||'-10-31' 
                    when :id_periode = 91 then (select varvalue from app_config where varname='tahun_anggaran')||'-11-30' 
                    when :id_periode = 92 then (select varvalue from app_config where varname='tahun_anggaran')||'-12-31' 
				end))
	) as penggunaan 
	,(select varValue from app_config where varname='tahun_anggaran')tahun_anggaran
from 
	aktivasi_bku ab
where 
	ab.soft_delete=0 
	and ab.id_anggaran=:id_anggaran 
	and ab.id_periode=
		case 
			when :id_periode = 1 then 81 
			when :id_periode = 2 then 87 
			when :id_periode = 11 then 81 
			when :id_periode = 12 then 84 
			when :id_periode = 13 then 89 
      when :id_periode > 80 then :id_periode
		end
