CREATE TABLE [ref_bku] (

  [id_ref_bku] int NOT NULL, 

  [bku] varchar(30) NOT NULL, 

  [kode_bku] varchar(5) NOT NULL, 

  [create_date] datetime NOT NULL, 

  [last_update] datetime NOT NULL, 

  [expired_date] datetime, 

  CONSTRAINT [sqlite_autoindex_ref_bku_1] PRIMARY KEY ([id_ref_bku]));