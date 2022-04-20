import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'report_bku' })
export class ReportBku extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_report_bku',
    length: 22,
    unique: true,
  })
  idReportBku: string

  @Column('numeric', { name: 'id_bulan', precision: 2, scale: 0 })
  idBulan: number

  @Column('varchar', { name: 'id_anggaran', length: 22 })
  idAnggaran: string

  @Column('numeric', { name: 'id_periode', precision: 2, scale: 0 })
  idPeriode: number

  @Column('datetime', { name: 'tanggal_buat' })
  tanggalBuat: Date

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
