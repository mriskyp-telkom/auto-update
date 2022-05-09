CREATE TABLE [aktivasi_bku] (
  [id_anggaran] varchar(22) NOT NULL, 
  [id_periode] numeric(2,0) NOT NULL, 
  [tanggal_aktivasi] datetime NOT NULL, 
  [tanggal_finish] datetime, 
  [saldo_awal_bank] numeric, 
  [saldo_awal_tunai] numeric, 
  [saldo_akhir_bank] numeric, 
  [saldo_akhir_tunai] numeric, 
  [saldo_awal_bank_sisa] numeric, 
  [saldo_awal_tunai_sisa] numeric, 
  [saldo_akhir_bank_sisa] numeric, 
  [saldo_akhir_tunai_sisa] numeric, 
  [soft_delete] numeric(1,0) NOT NULL DEFAULT 0, 
  [create_date] datetime NOT NULL, 
  [last_update] datetime NOT NULL, 
  [updater_id] varchar(22) NOT NULL, 

  CONSTRAINT [sqlite_autoindex_aktivasi_bku_1] PRIMARY KEY ([id_anggaran], [id_periode]));
