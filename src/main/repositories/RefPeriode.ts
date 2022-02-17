import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_periode')
export class RefPeriode extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'id_periode',
    precision: 2,
    scale: 0,
    unique: true,
  })
  idPeriode: number

  @Column('varchar', { name: 'periode', length: 50 })
  periode: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
