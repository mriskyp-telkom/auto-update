CREATE TABLE ptk (
    sekolah_id varchar(22) NOT NULL, 
    ptk_id varchar(22) NOT NULL, 
    tahun_ajaran_id int NOT NULL, 
    nama varchar(80) NOT NULL, 
    jenis_kelamin char(1) NOT NULL, 
    masa_kerja_tahun int NOT NULL, 
    masa_kerja_bulan int NOT NULL, 
    nuptk varchar(16) NULL,
    jenis_ptk_arkas int NOT NULL, 
    pernah_serfikasi int NOT NULL,
    is_cut_off int NOT NULL, 
    create_date datetime NOT NULL, 
    last_update datetime NOT NULL, 
    soft_delete int NOT NULL, 
    CONSTRAINT PK_PTK PRIMARY KEY ([sekolah_id], [ptk_id], [tahun_ajaran_id]) ON CONFLICT ROLLBACK
)
