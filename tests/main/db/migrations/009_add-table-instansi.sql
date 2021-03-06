CREATE TABLE instansi (
   instansi_id          varchar(22)          not null,
   ins_instansi_id      varchar(22)          null,
   jenis_instansi_id    numeric(2,0)         not null,
   kode_instansi        char(8)              null,
   nama                 varchar(80)          not null,
   alamat               varchar(50)          not null,
   kode_pos             int                  null,
   kode_wilayah         char(8)              not null,
   lintang              decimal(10,6)        null default null,
   bujur                decimal(10,6)        null default null,
   email                varchar(50)          null,
   telepon              varchar(20)          null,
   fax                  varchar(20)          null,
   website              varchar(50)          null,
   tag                  int                  null,
   soft_delete          numeric(1,0)         not null default 0,
   create_date          datetime             not null,
   last_update          datetime             not null,
   updater_id           varchar(22)          not null,
   constraint PK_INSTANSI primary key (instansi_id)
);