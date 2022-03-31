import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('FK_PARENT_JABATAN_FK', ['refJabatanId'], {})
@Entity('ref_jabatan')
export class RefJabatan extends BaseEntity {
  @Column('numeric', {
    primary: true,
    name: 'jabatan_id',
    precision: 6,
    scale: 0,
    unique: true,
  })
  jabatanId: number

  @Column('numeric', {
    name: 'ref_jabatan_id',
    nullable: true,
    precision: 6,
    scale: 0,
  })
  refJabatanId: number | null

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('int', { name: 'level_jabatan', nullable: true })
  levelJabatan: number | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
