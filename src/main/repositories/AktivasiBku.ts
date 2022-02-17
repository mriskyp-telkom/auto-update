import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('aktivasi_bku')
export class AktivasiBku extends BaseEntity {
  @Column('varchar', { primary: true, name: 'id_anggaran', length: 22 })
  idAnggaran: string

  @Column('numeric', {
    primary: true,
    name: 'id_periode',
    precision: 2,
    scale: 0,
  })
  idPeriode: number

  @Column('datetime', { name: 'tanggal_aktivasi' })
  tanggalAktivasi: Date

  @Column('datetime', { name: 'tanggal_finish', nullable: true })
  tanggalFinish: Date | null

  @Column('numeric', { name: 'saldo_awal_bank', nullable: true })
  saldoAwalBank: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_awal_tunai', nullable: true })
  saldoAwalTunai: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_akhir_bank', nullable: true })
  saldoAkhirBank: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_akhir_tunai', nullable: true })
  saldoAkhirTunai: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_awal_bank_sisa', nullable: true })
  saldoAwalBankSisa: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_awal_tunai_sisa', nullable: true })
  saldoAwalTunaiSisa: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_akhir_bank_sisa', nullable: true })
  saldoAkhirBankSisa: NonNullable<unknown> | null

  @Column('numeric', { name: 'saldo_akhir_tunai_sisa', nullable: true })
  saldoAkhirTunaiSisa: NonNullable<unknown> | null

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

  @Column('varchar', { name: 'updater_id', length: 22 })
  updaterId: string
}
