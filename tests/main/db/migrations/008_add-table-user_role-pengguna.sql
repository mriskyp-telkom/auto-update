CREATE TABLE user_role (
   userrole_id          varchar(22)                 not null,
   role_id              varchar(22)                 not null,
   instansi_pengguna_id varchar(22)                 not null,
   soft_delete          numeric(1,0)         not null default 0,
   create_date          datetime             not null,
   last_update          datetime             not null,
   updater_id           varchar(22)                 not null,
   constraint PK_USER_ROLE primary key (userrole_id)
);

CREATE TABLE instansi_pengguna (
   instansi_pengguna_id varchar(22)                 not null,
   pengguna_id          varchar(22)                 not null,
   instansi_id          varchar(22)                 not null,
   jabatan_id           numeric(6,0)         not null,
   sk                   varchar(150)         not null,
   tanggal_sk           datetime             null,
   soft_delete          numeric(1,0)         not null default 0,
   create_date          datetime             not null,
   last_update          datetime             not null,
   updater_id           varchar(22)                 not null,
   constraint PK_INSTANSI_PENGGUNA primary key (instansi_pengguna_id)
);

CREATE TABLE pengguna (
   pengguna_id          varchar(22)                 not null,
   nama                 varchar(80)          not null,
   tempat_lahir         varchar(50)          not null,
   tanggal_lahir        datetime             not null,
   jenis_kelamin        char(1)              not null,
   alamat               varchar(50)          null,
   kode_pos             int                  null,
   telepon              varchar(20)          null,
   show_telepon         numeric(1)           null constraint DF_pegawai_status_hp default (1),
   nip                  varchar(50)          null,
   kode_wilayah         char(8)              null,
   email                varchar(50)          not null,
   password             varchar(32)          not null,
   forgot_pass1         varchar(50)          null,
   forgot_pass2         varchar(50)          null,
   status_approval      numeric(1)           not null default 0,
   soft_delete          numeric(1,0)         not null default 0,
   create_date          datetime             not null,
   last_update          datetime             not null,
   updater_id           varchar(22)                 not null,
   constraint PK_PENGGUNA primary key (pengguna_id)
);