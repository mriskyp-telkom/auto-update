CREATE TABLE instansi_pengguna (
   instansi_pengguna_id varchar(22)          not null,
   pengguna_id          varchar(22)          not null,
   instansi_id          varchar(22)          not null,
   jabatan_id           numeric(6,0)         not null,
   sk                   varchar(150)         not null,
   tanggal_sk           datetime             null,
   soft_delete          numeric(1,0)         not null default 0,
   create_date          datetime             not null,
   last_update          datetime             not null,
   updater_id           varchar(22)          not null,
   constraint PK_INSTANSI_PENGGUNA primary key (instansi_pengguna_id)
)