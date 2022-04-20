import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'ref_negara' })
export class RefNegara extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'negara_id',
    length: 2,
    unique: true,
  })
  negaraId: NonNullable<unknown>

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('boolean', { name: 'luar_negeri' })
  luarNegeri: boolean

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
