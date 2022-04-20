import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'ref_rekening' })
export class RefRekening extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'kode_rekening',
    length: 20,
    unique: true,
  })
  kodeRekening: string

  @Column('varchar', { name: 'rekening', length: 200 })
  rekening: string

  @Column('varchar', { name: 'neraca', nullable: true, length: 200 })
  neraca: string | null

  @Column('numeric', {
    name: 'blokid',
    precision: 2,
    scale: 0,
    default: () => '0',
  })
  blokid: number

  @Column('numeric', { name: 'batas_atas', nullable: true })
  batasAtas: NonNullable<unknown> | null

  @Column('numeric', { name: 'batas_bawah', nullable: true })
  batasBawah: NonNullable<unknown> | null

  @Column('varchar', { name: 'validasi_type', nullable: true, length: 1 })
  validasiType: NonNullable<unknown> | null

  @Column('numeric', {
    name: 'is_ppn',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPpn: number | null

  @Column('numeric', {
    name: 'is_pph21',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph21: number | null

  @Column('numeric', {
    name: 'is_pph22',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph22: number | null

  @Column('numeric', {
    name: 'is_pph23',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph23: number | null

  @Column('numeric', {
    name: 'is_pph4',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isPph4: number | null

  @Column('numeric', {
    name: 'is_sspd',
    nullable: true,
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isSspd: number | null

  @Column('varchar', { name: 'bhp', nullable: true, length: 5 })
  bhp: NonNullable<unknown> | null

  @Column('numeric', {
    name: 'is_custom_pajak_1',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  isCustomPajak_1: number | null

  @Column('numeric', {
    name: 'is_honor',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  isHonor: number | null

  @Column('numeric', {
    name: 'is_buku',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  isBuku: number | null

  @Column('numeric', {
    name: 'is_custom_satuan',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  isCustomSatuan: number | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
