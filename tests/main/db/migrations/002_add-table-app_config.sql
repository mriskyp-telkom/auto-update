CREATE TABLE app_config (
   varname              varchar(50)          not null,
   varvalue             varchar(255)         not null,
   
   constraint PK_APP_CONFIG primary key (varname)
);