CREATE TABLE anggaran (
  id_anggaran varchar(22) NOT NULL, 
  id_ref_sumber_dana numeric(2,0) NOT NULL, 
  sekolah_id varchar(22) NOT NULL, 
  volume numeric(6,0), 
  harga_satuan money, 
  jumlah money, 
  sisa_anggaran money, 
  is_pengesahan numeric(1,0) DEFAULT 0, 
  tanggal_pengajuan datetime, 
  tanggal_pengesahan datetime, 
  is_approve numeric(1,0) NOT NULL DEFAULT 0, 
  is_revisi numeric(3,0) NOT NULL DEFAULT 0, 
  alasan_penolakan varchar(4000), 
  is_aktif numeric(1,0) NOT NULL DEFAULT 0, 
  tahun_anggaran numeric(4,0) NOT NULL DEFAULT 0, 
  soft_delete numeric(1,0) NOT NULL DEFAULT 0, 
  create_date datetime NOT NULL, 
  last_update datetime NOT NULL, 
  updater_id varchar(22), 
  id_penjab varchar(22), 

  CONSTRAINT CKC_IS_APPROVE_ANGGARAN CHECK(is_approve in (0,1,2)), 
  CONSTRAINT sqlite_autoindex_anggaran_1 PRIMARY KEY (id_anggaran)
);