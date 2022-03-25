CREATE INDEX [REL_SEKOLAH_WILAYAH_FK] ON [mst_sekolah] ([kode_wilayah] ASC);

CREATE INDEX [REL_ANGGARAN_FK] ON [rapbs] ([id_anggaran] ASC);
CREATE INDEX [REL_KODE_FK] ON [rapbs] ([id_ref_kode] ASC);
CREATE INDEX [REL_REK_FK] ON [rapbs] ([kode_rekening] ASC);
CREATE INDEX [REL_SEKOLAH_RAPBS_FK] ON [rapbs] ([sekolah_id] ASC);
CREATE INDEX [REL_TAHUN_RAPBS_FK] ON [rapbs] ([id_ref_tahun_anggaran] ASC);

CREATE INDEX [RECURSIVE_KODE_FK] ON [ref_kode] ([parent_kode] ASC);
CREATE INDEX [REL_JENIS_KODE_FK] ON [ref_kode] ([id_level_kode] ASC);

CREATE INDEX REL_PERIODE_FK on rapbs_periode (
id_periode ASC
);

CREATE INDEX REL_RAPBS_PERIODE_FK on rapbs_periode (
id_rapbs ASC
);