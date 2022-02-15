import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { InstansiPengguna } from './InstansiPengguna'
import { MstWilayah } from './MstWilayah'

@Index('FK_PARENT_INSTANSI_FK', ['insInstansiId'], {})
@Index('FK_INSTANSI_LEVELINSTANSI_FK', ['jenisInstansiId'], {})
@Entity('instansi')
export class Instansi extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'instansi_id',
    length: 22,
    unique: true,
  })
  instansiId: string

  @OneToMany(
    () => InstansiPengguna,
    (instansipengguna) => instansipengguna.instansi
  )
  instansipengguna: InstansiPengguna[]

  @Column('varchar', { name: 'ins_instansi_id', nullable: true, length: 22 })
  insInstansiId: string | null

  @Column('numeric', { name: 'jenis_instansi_id', precision: 2, scale: 0 })
  jenisInstansiId: number

  @Column('varchar', { name: 'kode_instansi', nullable: true, length: 8 })
  kodeInstansi: NonNullable<unknown> | null

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('varchar', { name: 'alamat', length: 50 })
  alamat: string

  @Column('int', { name: 'kode_pos', nullable: true })
  kodePos: number | null

  @Column('varchar', { name: 'kode_wilayah', length: 8 })
  kodeWilayah: NonNullable<unknown>

  @Column('decimal', {
    name: 'lintang',
    nullable: true,
    precision: 10,
    scale: 6,
    default: () => 'null',
  })
  lintang: number | null

  @Column('decimal', {
    name: 'bujur',
    nullable: true,
    precision: 10,
    scale: 6,
    default: () => 'null',
  })
  bujur: number | null

  @Column('varchar', { name: 'email', nullable: true, length: 50 })
  email: string | null

  @Column('varchar', { name: 'telepon', nullable: true, length: 20 })
  telepon: string | null

  @Column('varchar', { name: 'fax', nullable: true, length: 20 })
  fax: string | null

  @Column('varchar', { name: 'website', nullable: true, length: 50 })
  website: string | null

  @Column('int', { name: 'tag', nullable: true })
  tag: number | null

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

  @OneToMany(() => MstWilayah, (mstwilayah) => mstwilayah.kodeWilayah)
  @JoinColumn({
    name: 'kode_wilayah',
  })
  mstwilayah: MstWilayah
}
