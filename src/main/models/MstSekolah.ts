import { BaseEntity, Column, Entity, Index, OneToMany } from 'typeorm'
import { Anggaran } from './Anggaran'

@Index('REL_SEKOLAH_WILAYAH_FK', ['kodeWilayah'], {})
@Entity('mst_sekolah')
export class MstSekolah extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'sekolah_id',
    length: 22,
    unique: true,
  })
  sekolahId: string

  @OneToMany(() => Anggaran, (anggaran) => anggaran.mstsekolah)
  anggaran: Anggaran[]

  @Column('varchar', { name: 'kode_wilayah', length: 8 })
  kodeWilayah: NonNullable<string>

  @Column('varchar', { name: 'nama', nullable: true, length: 80 })
  nama: string | null

  @Column('varchar', { name: 'npsn', length: 8 })
  npsn: NonNullable<string>

  @Column('varchar', { name: 'alamat', length: 50 })
  alamat: string

  @Column('numeric', { name: 'status_sekolah', precision: 1, scale: 0 })
  statusSekolah: number

  @Column('smallint', { name: 'bentuk_pendidikan_id' })
  bentukPendidikanId: number

  @Column('varchar', { name: 'telepon', nullable: true, length: 20 })
  telepon: string | null

  @Column('varchar', { name: 'kepsek', length: 80 })
  kepsek: string

  @Column('varchar', { name: 'telepon_kepsek', nullable: true, length: 20 })
  teleponKepsek: string | null

  @Column('varchar', { name: 'nip_kepsek', nullable: true, length: 20 })
  nipKepsek: string | null

  @Column('varchar', { name: 'email_kepsek', nullable: true, length: 30 })
  emailKepsek: string | null

  @Column('varchar', { name: 'tu', nullable: true, length: 80 })
  tu: string | null

  @Column('varchar', { name: 'telepon_tu', nullable: true, length: 20 })
  teleponTu: string | null

  @Column('varchar', { name: 'nip_tu', nullable: true, length: 20 })
  nipTu: string | null

  @Column('varchar', { name: 'email_tu', nullable: true, length: 30 })
  emailTu: string | null

  @Column('numeric', {
    name: 'jumlah_siswa',
    nullable: true,
    precision: 4,
    scale: 0,
  })
  jumlahSiswa: number | null

  @Column('varchar', { name: 'kode_registrasi', nullable: true, length: 10 })
  kodeRegistrasi: string | null

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

  @Column('varchar', { name: 'updater_id', length: 22 })
  updaterId: string
}
