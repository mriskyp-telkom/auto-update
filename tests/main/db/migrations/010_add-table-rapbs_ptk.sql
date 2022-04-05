CREATE TABLE [rapbs_ptk] (
  [id_rapbs] varchar(22) not null, 
  [ptk_id] varchar(22) not null,   
  [nama] varchar(80) null,
  [create_date] datetime not null, 
  [last_update] datetime not null, 
  CONSTRAINT [] PRIMARY KEY ([id_rapbs], [ptk_id]));
