import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_sumber_dana')
export class RefSumberDana extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'id_ref_sumber_dana',
    precision: 2,
    scale: 0,
    unique: true,
  })
  idRefSumberDana: number

  @Column('varchar', { name: 'kode', length: 12 })
  kode: string

  @Column('varchar', { name: 'nama_sumber_dana', length: 50 })
  namaSumberDana: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
