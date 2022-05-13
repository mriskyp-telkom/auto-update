import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('kas_umum_pajak')
export class KasUmumPajak extends BaseEntity {
  @Column('varchar', { primary: true, name: 'id_kas_umum', length: 22 })
  idKasUmum: string

  @Column('varchar', { name: 'ntpn', nullable: true, length: 30 })
  ntpn: string | null

  @Column('datetime', { name: 'tanggal_lapor', nullable: true })
  tanggalLapor: Date | null

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

  @Column('varchar', { name: 'updater_id', length: 22, nullable: true })
  updaterId: string | null
}
