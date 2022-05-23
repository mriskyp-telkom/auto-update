import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_acuan_barang')
export class RefAcuanBarang extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_barang',
    length: 40,
    unique: true,
  })
  idBarang: string

  @Column('varchar', { name: 'kode_rekening', nullable: true, length: 20 })
  kodeRekening: string | null

  @Column('varchar', { name: 'nama_barang', length: 255 })
  namaBarang: string

  @Column('varchar', { name: 'satuan', nullable: true, length: 30 })
  satuan: string | null

  @Column('varchar', { name: 'blok_id', length: 6 })
  blokId: string

  @Column('varchar', { name: 'kode_belanja', nullable: true, length: 4 })
  kodeBelanja: string | null

  @Column('numeric', { name: 'harga_barang', nullable: true })
  hargaBarang: NonNullable<number> | null

  @Column('numeric', { name: 'batas_bawah', nullable: true })
  batasBawah: NonNullable<number> | null

  @Column('numeric', { name: 'batas_atas', nullable: true })
  batasAtas: NonNullable<number> | null

  @Column('varchar', { name: 'kategori_id', nullable: true, length: 20 })
  kategoriId: string | null

  @Column('varchar', { name: 'hs_code', nullable: true, length: 20 })
  hsCode: string | null

  @Column('varchar', { name: 'kbki', nullable: true, length: 20 })
  kbki: string | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
