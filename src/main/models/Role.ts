import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('FK_ROLEAPP_FK', ['appId'], {})
@Entity('role')
export class Role extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'role_id',
    length: 22,
    unique: true,
  })
  roleId: string

  @Column('varchar', { name: 'app_id', length: 22 })
  appId: string

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

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
}
