import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_tahun_anggaran')
export class RefTahunAnggaran extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'id_ref_tahun_anggaran',
    precision: 2,
    scale: 0,
    unique: true,
  })
  idRefTahunAnggaran: number

  @Column('varchar', { name: 'tahun_anggaran', length: 5 })
  tahunAnggaran: string

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
