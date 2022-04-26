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
 ('j4AhkRGWlESgXkdlxUvQXQ', '07.', '', 'Pengembangan standar pembiayaan', 1, 1, 1, 1, 1, 1, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('JfpVF35Cd0aOZmb0bhN2iA', '07.12.01.', 'HlLBCW6Q7U-ijOx07EHCyA', 'Pembayaran Honor Guru', 1, 1, 1, 1, 1, 3, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL),
 ('HlLBCW6Q7U-ijOx07EHCyA', '07.12.', 'j4AhkRGWlESgXkdlxUvQXQ', 'Pembiayaan untuk Pembayaran Honor', 1, 1, 1, 1, 1, 2, 6, '2018-07-08', '2020-02-24 11:00:00.000', NULL);

INSERT INTO ref_rekening (kode_rekening, rekening, neraca, blokid, batas_atas, batas_bawah, validasi_type, is_ppn, is_pph21, is_pph22, is_pph23, is_pph4, is_sspd, bhp, is_custom_pajak_1, is_honor, is_buku, is_custom_satuan, create_date, last_update, expired_date) 
VALUES 
('5.1.02.01.01.0055', 'Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan', '', 1, NULL, NULL, NULL, 0, 0, 0, 1, 0, 1, 'bhp', NULL, NULL, NULL, NULL, '2020-12-01', '2020-12-01', NULL),
('5.1.02.02.01.0003', 'Honorarium Narasumber atau Pembahas, Moderator, Pembawa Acara, dan Panitia', '', 1, NULL, NULL, NULL, 0, 1, 0, 0, 0, 0, 'bbj', NULL, NULL, NULL, NULL, '2020-12-01', '2020-12-01', NULL);

insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('b34b3e40-a205-4be0-b1f5-0a516470ca2b', 'buah', 'buah', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('5a231dda-c540-4184-b91a-f0d2330e74de', 'lembar', 'lembar', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('68027be6-d500-409f-bbb6-7cb964dd13a3', 'paket', 'paket', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('1977e13c-f2f8-4c27-88d4-f604e4c679f4', 'rim', 'rim', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('18d5b1f5-91e5-496b-9b47-d9125cad6359', 'botol', 'botol', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('470ae75f-cd34-484e-a1bc-e93d847a8469', 'dus', 'dus', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('598f3fdb-070c-4480-ac2d-02eec373dcdc', 'pak', 'pak', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('ff619b32-c936-491e-870f-a64958d18121', 'kotak', 'kotak', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('a40c5bb1-5558-4c33-89c6-c2cc041168e3', 'lusin', 'lusin', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('42b10698-4687-4f90-a3e8-5ba091beaa32', 'kg', 'kg', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('3ba0d25a-d365-4da4-b6ae-74ecf4e9241f', 'kaleng', 'kaleng', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('2e71226d-e4ac-4090-9dc0-19a8227fbe3c', 'rol', 'rol', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('d28564a1-fef1-4214-b6b2-8eb9d7cb8223', 'jpl', 'Jam pelajaran', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('cc9fe5e1-8fc8-43b7-bac3-8566e3784031', 'meter', 'meter', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('f26f9ca5-6033-4084-8234-859ff7d1a692', 'sak', 'sak', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('0147e841-ff78-4b39-94df-5f73f61f7c96', 'bungkus', 'bungkus', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('6a815344-d791-47d4-b4ac-6f336a6a91cc', 'hari', 'hari', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('65b246eb-7084-4c5a-9f58-be779fef39f2', 'liter', 'liter', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('b61a5ec1-7506-4580-820b-fa289d566a86', 'batang', 'batang', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('3a7b56da-31a3-471c-a6b2-2d11b7d1977d', 'galon', 'galon', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('67418914-5d6f-42d1-b520-10789391d793', 'rit', 'rit', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('f4078e07-ab08-43cf-8de0-14926e5f0d07', 'm3', 'm3', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('d70f65a2-2fae-4c03-9186-91db8f328ca1', 'tahap', 'tahap', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('19c73535-47fe-4567-8989-afa1f4cf4ab4', 'colt', 'truk colt', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('c0090dbb-54ce-4386-98b1-705ed066224b', 'om', 'materi ajar', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('65cd0931-0ce4-4f30-abb2-c6e8096d9a3a', 'strip', 'strip', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('788f06b7-c336-42d5-acb1-0d603b634981', 'tabung', 'tabung', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('47e8c6ab-5a7d-464d-8238-a05bbc2b68b3', 'm2', 'm2', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('c46e1817-4b2b-4a61-9ced-63d4411b95c7', 'dam', 'dump truck', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('7c495f5f-7595-436c-852a-a460b50f55de', 'pasang', 'pasang', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('f7158f83-dac3-4819-b667-2c7ababa3bda', 'polybag', 'polybag', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('56fca4aa-b2c2-416e-829b-cb58a0368691', 'porsi', 'porsi', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('6fd85ee5-e1b2-4a92-a3ec-da0bda3cfb03', 'saset', 'saset', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('0cbddf76-2c24-4880-849c-b337355325cd', 'gelas', 'gelas', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('c5b25eee-9477-4066-a4a3-56d1deead9d4', 'cm', 'cm', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('18bb19b6-5ebf-4219-9d80-cc2aeea811ac', 'tablet', 'tablet', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
    
insert into ref_satuan (ref_satuan_id, unit, satuan, soft_delete, create_date, expired_date, last_update)
values
('4722b517-89af-4e41-8de6-13245fd98bd0', 'ekor', 'ekor', 
    0, '2020-03-09 15:35:30.000' , NULL, '2020-03-09 15:35:30.000' );
