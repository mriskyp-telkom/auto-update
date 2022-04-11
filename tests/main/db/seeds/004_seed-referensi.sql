INSERT INTO ref_kode (id_ref_kode, id_kode, parent_kode, uraian_kode, is_bos_pusat, is_bos_prop, is_bos_kab, is_komite, is_lainnnya, id_level_kode, bentuk_pendidikan_id, create_date, last_update, expired_date) 
VALUES 
 ('-L7wLMMh0Ea35t3u-nZ-Hg', '02.03.65.', 'eg9frjOQZ0uWmv2G6pb_3Q', 'Penyusunan Kurikulum', 1, 1, 1, 1, 1, 3, 10, '2019-11-09 12:00:00.000', '2019-11-09 15:00:00.000', NULL),
 ('StKNAtFFHE2zwBiTD4AI1w', '02.03.65.', '8u_I_uPpD0mDqAy52Pv9Gg', 'Penyusunan Kurikulum', 1, 1, 1, 1, 1, 3, 13, '2020-02-24 11:00:00.000', '2021-12-22 18:00:00.000', NULL),
 ('rBdJhBgAdU2dU2DF6JFfhA', '02.03.65.', 'uOersCpKd0KFRGbjL0mJOw', 'Penyusunan Kurikulum', 1, 1, 1, 1, 1, 3, 6, '2018-07-08', '2021-12-22 18:00:00.000', NULL),
 ('YRS4K6islEOdY5I1FW641A', '02.03.65.', 'Xoq0-0BjLEiKCL5hvmnkkg', 'Penyusunan Kurikulum', 1, 1, 1, 1, 1, 3, 5, '2018-07-08', '2021-12-22 18:00:00.000', NULL),
 ('jxPrtDGnnU2oRvxVnUtTAg', '02.03.65.', 'kVbs-mJx7kCeyMDRAzDDcQ', 'Penyusunan Kurikulum', 1, 1, 1, 1, 1, 3, 29, '2020-02-24 11:00:00.000', '2021-12-22 18:00:00.000', NULL),
 ('NGpxABUVsE6_05odK4wa8w', '02.03.65.', 'NkAmaraF2U6w8yWLFV39wg', 'Penyusunan Kurikulum', 1, 1, 1, 1, 1, 3, 15, '2021-12-23', '2021-12-23', NULL),
 ('uOersCpKd0KFRGbjL0mJOw', '02.03.', 'LZG05Td-1EisChtLS1qNsA', 'Pembiayaan Kegiatan Pembelajaran dan Ekstrakurikuler', 1, 1, 1, 1, 1, 2, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('22OId5G6YUOZTaSawYOvcw', '05.', '', 'Pengembangan sarana dan prasarana sekolah', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('4vNwWzqXlEC1z4XrpSzrFw', '08.', '', 'Pengembangan dan implementasi sistem penilaian', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('6nHvlB1k1EacrUSb63Zm_w', '03.', '', 'Pengembangan Standar Proses', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('BuLUTNIfsU-cEq0pdh0kvQ', '06.', '', 'Pengembangan standar pengelolaan', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('DUyVL2AtDE6xb0buCnSUEQ', '04.', '', 'Pengembangan pendidik dan tenaga kependidikan', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('LZG05Td-1EisChtLS1qNsA', '02.', '', 'Pengembangan Standar Isi', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('j4AhkRGWlESgXkdlxUvQXQ', '07.', '', 'Pengembangan standar pembiayaan', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL);

INSERT INTO ref_rekening (kode_rekening, rekening, neraca, blokid, batas_atas, batas_bawah, validasi_type, is_ppn, is_pph21, is_pph22, is_pph23, is_pph4, is_sspd, bhp, is_custom_pajak_1, is_honor, is_buku, is_custom_satuan, create_date, last_update, expired_date) 
VALUES 
('5.1.02.01.01.0055', 'Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan', '', 1, NULL, NULL, NULL, 0, 0, 0, 1, 0, 1, 'bhp', NULL, NULL, NULL, NULL, '2020-12-01', '2020-12-01', NULL),
('5.1.02.02.01.0003', 'Honorarium Narasumber atau Pembahas, Moderator, Pembawa Acara, dan Panitia', '', 1, NULL, NULL, NULL, 0, 1, 0, 0, 0, 0, 'bbj', NULL, NULL, NULL, NULL, '2020-12-01', '2020-12-01', NULL);

insert into ref_satuan (ref_satuan_id, unit, satuan, 
    soft_delete, created_date, expired_date, last_update)
values
('F02AC478-2FF5-E011-84D1-CFDBD42BDA04', 'OTA', 'Orang Tahun', 
    0, 2022-01-01, NULL, 2022-01-01);

insert into ref_satuan (ref_satuan_id, unit, satuan, 
    soft_delete, created_date, expired_date, last_update)
values
('F02AC478-2FF5-E011-84D1-CFDBD42BDA0B', 'OR', 'Orang', 
    0, 2022-01-01, NULL, 2022-01-01);
