import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_level_kode')
export class RefLevelKode extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'id_level_kode',
    precision: 2,
    scale: 0,
    unique: true,
  })
  idLevelKode: number

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
