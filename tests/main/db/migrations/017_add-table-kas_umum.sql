CREATE TABLE [kas_umum] (
  [id_kas_umum] varchar(22) NOT NULL, 
  [id_kas_nota] varchar(22), 
  [id_rapbs_periode] varchar(22), 
  [kode_rekening] varchar(20), 
  [id_ref_bku] int NOT NULL, 
  [id_anggaran] varchar(22) NOT NULL, 
  [parent_id_kas_umum] varchar(22), 
  [tanggal_transaksi] datetime NOT NULL, 
  [no_bukti] varchar(30), 
  [uraian] varchar(500) NOT NULL, 
  [uraian_pajak] varchar(255), 
  [saldo] numeric NOT NULL, 
  [status_bku] char(1), 
  [volume] numeric(6,0), 
  [is_ppn] numeric(1,0) NOT NULL DEFAULT 0, 
  [is_pph_21] numeric(1,0) NOT NULL DEFAULT 0, 
  [is_pph_22] numeric(1,0) NOT NULL DEFAULT 0, 
  [is_pph_23] numeric(1,0) NOT NULL DEFAULT 0, 
  [is_pph_4] numeric(1,0) NOT NULL DEFAULT 0, 
  [is_sspd] numeric(1,0) NOT NULL DEFAULT 0, 
  [is_lock] numeric(1,0), 
  [tanggal_lock] datetime, 
  [soft_delete] numeric(1,0) NOT NULL DEFAULT 0, 
  [create_date] datetime NOT NULL, 
  [last_update] datetime NOT NULL, 
  [updater_id] varchar(22) NULL, 

  CONSTRAINT [sqlite_autoindex_kas_umum_1] PRIMARY KEY ([id_kas_umum]));
