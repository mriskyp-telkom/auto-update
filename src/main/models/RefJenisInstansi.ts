import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ref_jenis_instansi')
export class RefJenisInstansi extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'jenis_instansi_id',
    precision: 2,
    scale: 0,
    unique: true,
  })
  jenisInstansiId: number

  @Column('varchar', { name: 'nama', nullable: true, length: 80 })
  nama: string | null

  @Column('int', { name: 'sort', nullable: true })
  sort: number | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
