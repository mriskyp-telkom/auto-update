import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { MstSekolah } from './MstSekolah'

@Entity('anggaran')
export class Anggaran extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_anggaran',
    length: 22,
    unique: true,
  })
  idAnggaran: string

  @Column('numeric', { name: 'id_ref_sumber_dana', precision: 2, scale: 0 })
  idRefSumberDana: number

  @Column('varchar', { name: 'sekolah_id', length: 22 })
  sekolahId: string

  @Column('numeric', { name: 'volume', nullable: true, precision: 6, scale: 0 })
  volume: number | null

  @Column('numeric', { name: 'harga_satuan', nullable: true })
  hargaSatuan: NonNullable<number> | null

  @Column('numeric', { name: 'jumlah', nullable: true })
  jumlah: NonNullable<number> | null

  @Column('numeric', { name: 'sisa_anggaran', nullable: true })
  sisaAnggaran: NonNullable<number> | null

  @Column('numeric', {
    name: 'is_pengesahan',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPengesahan: number | null

  @Column('datetime', { name: 'tanggal_pengajuan', nullable: true })
  tanggalPengajuan: Date | null

  @Column('datetime', { name: 'tanggal_pengesahan', nullable: true })
  tanggalPengesahan: Date | null

  @Column('numeric', {
    name: 'is_approve',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isApprove: number

  @Column('numeric', {
    name: 'is_revisi',
    precision: 3,
    scale: 0,
    default: () => '0',
  })
  isRevisi: number

  @Column('varchar', { name: 'alasan_penolakan', nullable: true, length: 4000 })
  alasanPenolakan: string | null

  @Column('numeric', {
    name: 'is_aktif',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isAktif: number

  @Column('numeric', {
    name: 'tahun_anggaran',
    precision: 4,
    scale: 0,
    default: () => '2022',
  })
  tahunAnggaran: number

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

  @Column('varchar', { name: 'id_penjab', nullable: true, length: 22 })
  idPenjab: string | null

  @ManyToOne(() => MstSekolah, (mstsekolah) => mstsekolah.sekolahId)
  @JoinColumn({
    name: 'sekolah_id',
  })
  mstsekolah: MstSekolah
}
