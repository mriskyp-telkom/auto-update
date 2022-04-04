import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_bulan')
export class RefBulan extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'id_bulan',
    precision: 2,
    scale: 0,
    unique: true,
  })
  idBulan: number

  @Column('numeric', { name: 'id_periode', precision: 2, scale: 0 })
  idPeriode: number

  @Column('varchar', { name: 'bulan', length: 20 })
  bulan: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
