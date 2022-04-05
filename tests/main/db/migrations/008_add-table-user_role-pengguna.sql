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


