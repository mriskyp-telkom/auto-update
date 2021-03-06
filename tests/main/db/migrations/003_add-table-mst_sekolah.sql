CREATE TABLE mst_sekolah (
  sekolah_id varchar(22) NOT NULL, 
  kode_wilayah char(8) NOT NULL, 
  nama varchar(80), 
  npsn char(8) NOT NULL, 
  alamat varchar(50) NOT NULL, 
  status_sekolah numeric(1) NOT NULL, 
  bentuk_pendidikan_id smallint NOT NULL, 
  telepon varchar(20), 
  kepsek varchar(80) NOT NULL, 
  telepon_kepsek varchar(20), 
  nip_kepsek varchar(20), 
  email_kepsek varchar(30), 
  tu varchar(80), 
  telepon_tu varchar(20), 
  nip_tu varchar(20), 
  email_tu varchar(30), 
  jumlah_siswa numeric(4), 
  kode_registrasi varchar(10), 
  soft_delete numeric(1,0) NOT NULL DEFAULT 0, 
  create_date datetime NOT NULL, 
  last_update datetime NOT NULL, 
  updater_id varchar(22) NOT NULL, 

  CONSTRAINT sqlite_autoindex_mst_sekolah_1 PRIMARY KEY (sekolah_id));

