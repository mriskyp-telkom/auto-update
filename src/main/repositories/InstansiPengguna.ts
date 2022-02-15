import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm'
import { Instansi } from './Instansi'
import { Pengguna } from './Pengguna'
import { UserRole } from './UserRole'

@Index('FK_HISTORYJABATAN_JABATAN_FK', ['jabatanId'], {})
@Index('FK_HISTORYJABATAN_INSTANSI_FK', ['instansiId'], {})
@Index('FK_HISTORYJABATAN_PEGAWAI_FK', ['penggunaId'], {})
@Entity('instansi_pengguna')
export class InstansiPengguna extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'instansi_pengguna_id',
    length: 22,
    unique: true,
  })
  instansiPenggunaId: string

  @OneToMany(() => UserRole, (userrole) => userrole.instansipengguna)
  userrole: UserRole[]

  @Column('varchar', { name: 'pengguna_id', length: 22 })
  penggunaId: string

  @Column('varchar', { name: 'instansi_id', length: 22 })
  instansiId: string

  @Column('numeric', { name: 'jabatan_id', precision: 6, scale: 0 })
  jabatanId: number

  @Column('varchar', { name: 'sk', length: 150 })
  sk: string

  @Column('datetime', { name: 'tanggal_sk', nullable: true })
  tanggalSk: Date | null

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

  @ManyToOne(() => Instansi, (instansi) => instansi.instansiId)
  @JoinColumn({
    name: 'instansi_id',
  })
  instansi: Instansi

  @ManyToOne(() => Pengguna, (pengguna) => pengguna.penggunaId)
  @JoinColumn({
    name: 'pengguna_id',
  })
  pengguna: Pengguna
}
