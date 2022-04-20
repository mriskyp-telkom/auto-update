import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('REL_RKA_INDIKATOR_FK', ['idRka'], {})
@Index('REL_REF_INDIKATOR_FK', ['idRefIndikator'], {})
@Entity({ name: 'indikator' })
export class Indikator extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_indikator',
    length: 22,
    unique: true,
  })
  idIndikator: string

  @Column('numeric', { name: 'id_ref_indikator', precision: 2, scale: 0 })
  idRefIndikator: number

  @Column('varchar', { name: 'id_rka', nullable: true, length: 22 })
  idRka: string | null

  @Column('varchar', { name: 'tolak_ukur', nullable: true, length: 2000 })
  tolakUkur: string | null

  @Column('varchar', { name: 'capaian', nullable: true, length: 2000 })
  capaian: string | null

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
