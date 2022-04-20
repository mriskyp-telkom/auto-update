import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'ref_rekening_transfer' })
export class RefRekeningTransfer extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'kode_rekening_old',
    length: 20,
    unique: true,
  })
  kodeRekeningOld: string

  @Column('varchar', { name: 'rekening_old', nullable: true, length: 200 })
  rekeningOld: string | null

  @Column('varchar', { name: 'kode_rekening_new', nullable: true, length: 20 })
  kodeRekeningNew: string | null

  @Column('varchar', { name: 'rekening_new', nullable: true, length: 200 })
  rekeningNew: string | null

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null

  @Column('datetime', { name: 'last_update', nullable: true })
  lastUpdate: Date | null
}
