CREATE TABLE token (
   token_id             varchar(22)         not null,
   userrole_id          varchar(22)         not null,
   app_id               varchar(22)         not null,
   ipaddr               varchar(30)         null,
   browser              varchar(200)        null,
   create_date          datetime            not null,
   last_update          datetime            not null,
   expired_date         datetime            null,
   constraint PK_TOKEN primary key (token_id)
)