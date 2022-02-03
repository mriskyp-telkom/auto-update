import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_level_wilayah')
export class RefLevelWilayah extends BaseEntity {
  @Column('smallint', { primary: true, name: 'id_level_wilayah', unique: true })
  idLevelWilayah: number

  @Column('varchar', { name: 'level_wilayah', nullable: true, length: 15 })
  levelWilayah: string | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
