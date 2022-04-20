import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'kas_umum' })
export class KasUmum extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_kas_umum',
    length: 22,
    unique: true,
  })
  idKasUmum: string

  @Column('varchar', { name: 'id_kas_nota', nullable: true, length: 22 })
  idKasNota: string | null

  @Column('varchar', { name: 'id_rapbs_periode', nullable: true, length: 22 })
  idRapbsPeriode: string | null

  @Column('varchar', { name: 'kode_rekening', nullable: true, length: 20 })
  kodeRekening: string | null

  @Column('int', { name: 'id_ref_bku' })
  idRefBku: number

  @Column('varchar', { name: 'id_anggaran', length: 22 })
  idAnggaran: string

  @Column('varchar', { name: 'parent_id_kas_umum', nullable: true, length: 22 })
  parentIdKasUmum: string | null

  @Column('datetime', { name: 'tanggal_transaksi' })
  tanggalTransaksi: Date

  @Column('varchar', { name: 'no_bukti', nullable: true, length: 30 })
  noBukti: string | null

  @Column('varchar', { name: 'uraian', length: 500 })
  uraian: string

  @Column('varchar', { name: 'uraian_pajak', nullable: true, length: 255 })
  uraianPajak: string | null

  @Column('numeric', { name: 'saldo' })
  saldo: NonNullable<unknown>

  @Column('varchar', { name: 'status_bku', nullable: true, length: 1 })
  statusBku: NonNullable<unknown> | null

  @Column('numeric', { name: 'volume', nullable: true, precision: 6, scale: 0 })
  volume: number | null

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

  @Column('numeric', {
    name: 'is_sspd',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  isSspd: number

  @Column('numeric', {
    name: 'is_lock',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  isLock: number | null

  @Column('datetime', { name: 'tanggal_lock', nullable: true })
  tanggalLock: Date | null

  @Column('numeric', {
    name: 'soft_delete',
    precision: 1,
    scale: 0,
    default: () => '0',
  })
  softDelete: number

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('varchar', { name: 'updater_id', nullable: true, length: 22 })
  updaterId: string | null
}
