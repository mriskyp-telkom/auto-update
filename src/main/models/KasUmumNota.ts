import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('kas_umum_nota')
export class KasUmumNota extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_kas_nota',
    nullable: true,
    length: 22,
    unique: true,
  })
  idKasNota: string | null

  @Column('varchar', { name: 'no_bukti', nullable: true, length: 30 })
  noBukti: string | null

  @Column('date', { name: 'tanggal_nota', nullable: true })
  tanggalNota: string | null

  @Column('varchar', { name: 'no_nota', nullable: true, length: 30 })
  noNota: string | null

  @Column('varchar', { name: 'nama_toko', nullable: true, length: 50 })
  namaToko: string | null

  @Column('varchar', { name: 'alamat_toko', nullable: true, length: 80 })
  alamatToko: string | null

  @Column('varchar', { name: 'npwp', nullable: true, length: 20 })
  npwp: string | null

  @Column('numeric', { name: 'total', nullable: true })
  total: NonNullable<number> | null

  @Column('varchar', { name: 'kode_rekening', nullable: true, length: 20 })
  kodeRekening: string | null

  @Column('varchar', { name: 'id_ref_kode', nullable: true, length: 22 })
  idRefKode: string | null

  @Column('numeric', {
    name: 'has_ppn',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  hasPpn: number | null

  @Column('numeric', {
    name: 'has_pph_22',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  hasPph22: number | null

  @Column('datetime', { name: 'create_date', nullable: true })
  createDate: Date | null

  @Column('datetime', { name: 'last_update', nullable: true })
  lastUpdate: Date | null

  @Column('numeric', {
    name: 'soft_delete',
    nullable: true,
    precision: 1,
    scale: 0,
  })
  softDelete: number | null

  @Column('varchar', { name: 'updater_id', nullable: true, length: 22 })
  updaterId: string | null
}
