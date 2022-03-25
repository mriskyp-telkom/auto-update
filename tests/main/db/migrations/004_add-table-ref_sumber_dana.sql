CREATE TABLE ref_sumber_dana (
   id_ref_sumber_dana   numeric(2,0)         not null,
   kode                 varchar(12)          not null,
   nama_sumber_dana     varchar(50)          not null,
   create_date          datetime             not null,
   last_update          datetime             not null,
   expired_date         datetime             null,
   constraint PK_REF_SUMBER_DANA primary key (id_ref_sumber_dana)
);