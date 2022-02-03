import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_bku')
export class RefBku extends BaseEntity {
  @Column('int', { primary: true, name: 'id_ref_bku', unique: true })
  idRefBku: number

  @Column('varchar', { name: 'bku', length: 30 })
  bku: string

  @Column('varchar', { name: 'kode_bku', length: 5 })
  kodeBku: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
