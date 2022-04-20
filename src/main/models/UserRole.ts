import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import { InstansiPengguna } from './InstansiPengguna'

@Index('FK_USER_ROLE_FK', ['roleId'], {})
@Index('FK_PENGGUNA_ROLE_FK', ['instansiPenggunaId'], {})
@Entity({ name: 'user_role' })
export class UserRole extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'userrole_id',
    length: 22,
    unique: true,
  })
  userroleId: string

  @Column('varchar', { name: 'role_id', length: 22 })
  roleId: string

  @Column('varchar', { name: 'instansi_pengguna_id', length: 22 })
  instansiPenggunaId: string

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

  @ManyToOne(
    () => InstansiPengguna,
    (instansipenguna) => instansipenguna.instansiPenggunaId
  )
  @JoinColumn({
    name: 'instansi_pengguna_id',
  })
  instansipengguna: InstansiPengguna
}
