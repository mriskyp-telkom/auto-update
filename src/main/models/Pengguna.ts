import { BaseEntity, Column, Entity, OneToMany } from 'typeorm'
import { InstansiPengguna } from './InstansiPengguna'

@Entity({ name: 'pengguna' })
export class Pengguna extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'pengguna_id',
    length: 22,
    unique: true,
  })
  penggunaId: string

  @OneToMany(
    () => InstansiPengguna,
    (instansipengguna) => instansipengguna.pengguna
  )
  instansipengguna: InstansiPengguna[]

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('varchar', { name: 'tempat_lahir', length: 50 })
  tempatLahir: string

  @Column('datetime', { name: 'tanggal_lahir' })
  tanggalLahir: Date

  @Column('varchar', { name: 'jenis_kelamin', length: 1 })
  jenisKelamin: NonNullable<unknown>

  @Column('varchar', { name: 'alamat', nullable: true, length: 50 })
  alamat: string | null

  @Column('int', { name: 'kode_pos', nullable: true })
  kodePos: number | null

  @Column('varchar', { name: 'telepon', nullable: true, length: 20 })
  telepon: string | null

  @Column('numeric', {
    name: 'show_telepon',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '1',
  })
  showTelepon: number | null

  @Column('varchar', { name: 'nip', nullable: true, length: 50 })
  nip: string | null

  @Column('varchar', { name: 'kode_wilayah', nullable: true, length: 8 })
  kodeWilayah: NonNullable<unknown> | null

  @Column('varchar', { name: 'email', length: 50 })
  email: string

  @Column('varchar', { name: 'password', length: 32 })
  password: string

  @Column('varchar', { name: 'forgot_pass1', nullable: true, length: 50 })
  forgotPass1: string | null

  @Column('varchar', { name: 'forgot_pass2', nullable: true, length: 50 })
  forgotPass2: string | null

  @Column('numeric', {
    name: 'status_approval',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  statusApproval: number

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
