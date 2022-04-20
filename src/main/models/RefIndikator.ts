import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'ref_indikator' })
export class RefIndikator extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'id_ref_indikator',
    precision: 2,
    scale: 0,
    unique: true,
  })
  idRefIndikator: number

  @Column('varchar', { name: 'nama_indikator', length: 255 })
  namaIndikator: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
