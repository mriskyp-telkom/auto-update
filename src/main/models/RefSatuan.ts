import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_satuan')
export class RefSatuan extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'ref_satuan_id',
    length: 22,
  })
  refSatuanId: string

  @Column('varchar', {
    name: 'satuan',
    length: 30,
    unique: true,
  })
  satuan: string

  @Column('varchar', { name: 'unit', length: 30 })
  unit: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
