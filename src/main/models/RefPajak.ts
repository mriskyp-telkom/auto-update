import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'ref_pajak' })
export class RefPajak extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_ref_pajak',
    length: 22,
    unique: true,
  })
  idRefPajak: string

  @Column('varchar', { name: 'kode_rekening', length: 20 })
  kodeRekening: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null

  @Column('numeric', {
    name: 'is_ppn',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPpn: number

  @Column('numeric', {
    name: 'is_pph_21',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph_21: number

  @Column('numeric', {
    name: 'is_pph_22',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph_22: number

  @Column('numeric', {
    name: 'is_pph_23',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph_23: number

  @Column('numeric', {
    name: 'is_pph_4',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph_4: number
}
