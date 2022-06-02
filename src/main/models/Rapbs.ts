import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('REL_TAHUN_RAPBS_FK', ['idRefTahunAnggaran'], {})
@Index('REL_SEKOLAH_RAPBS_FK', ['sekolahId'], {})
@Index('REL_REK_FK', ['kodeRekening'], {})
@Index('REL_KODE_FK', ['idRefKode'], {})
@Index('REL_ANGGARAN_FK', ['idAnggaran'], {})
@Entity('rapbs')
export class Rapbs extends BaseEntity {
  public constructor(init?: Partial<Rapbs>) {
    super()
    Object.assign(this, init)
  }

  @Column('varchar', {
    primary: true,
    name: 'id_rapbs',
    length: 22,
    unique: true,
  })
  idRapbs: string

  @Column('varchar', { name: 'sekolah_id', length: 22 })
  sekolahId: string

  @Column('varchar', { name: 'id_anggaran', length: 22 })
  idAnggaran: string

  @Column('varchar', { name: 'id_ref_kode', length: 22 })
  idRefKode: string

  @Column('numeric', { name: 'id_ref_tahun_anggaran', precision: 4, scale: 0 })
  idRefTahunAnggaran: number

  @Column('varchar', { name: 'kode_rekening', length: 20 })
  kodeRekening: string

  @Column('varchar', { name: 'id_barang', nullable: true, length: 40 })
  idBarang: string | null

  @Column('varchar', { name: 'urutan', nullable: true, length: 3 })
  urutan: string | null

  @Column('varchar', { name: 'uraian', length: 500 })
  uraian: string

  @Column('varchar', { name: 'uraian_text', nullable: true, length: 255 })
  uraianText: string | null

  @Column('numeric', { name: 'volume', precision: 6, scale: 0 })
  volume: number

  @Column('varchar', { name: 'satuan', length: 30 })
  satuan: string

  @Column('numeric', { name: 'harga_satuan' })
  hargaSatuan: NonNullable<number>

  @Column('numeric', { name: 'jumlah' })
  jumlah: NonNullable<number>

  @Column('numeric', { name: 'v1', nullable: true, precision: 4, scale: 0 })
  v1: number | null

  @Column('varchar', { name: 's1', nullable: true, length: 30 })
  s1: string | null

  @Column('numeric', { name: 'v2', nullable: true, precision: 4, scale: 0 })
  v2: number | null

  @Column('varchar', { name: 's2', nullable: true, length: 30 })
  s2: string | null

  @Column('numeric', { name: 'v3', nullable: true, precision: 4, scale: 0 })
  v3: number | null

  @Column('varchar', { name: 's3', nullable: true, length: 30 })
  s3: string | null

  @Column('numeric', { name: 'v4', nullable: true, precision: 4, scale: 0 })
  v4: number | null

  @Column('varchar', { name: 's4', nullable: true, length: 30 })
  s4: string | null

  @Column('varchar', { name: 'keterangan', nullable: true, length: 2000 })
  keterangan: string | null

  @Column('numeric', {
    name: 'soft_delete',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  softDelete: number

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('varchar', { name: 'updater_id', nullable: true, length: 22 })
  updaterId: string | null
}
