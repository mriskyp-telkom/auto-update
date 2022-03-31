import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('REL_ANGGARAN_PENGESAHAN_FK', ['idAnggaran'], {})
@Index('REL_SAH_RAPBS_FK', ['idRapbs'], {})
@Entity('pengesahan')
export class Pengesahan extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_pengesahan',
    length: 22,
    unique: true,
  })
  idPengesahan: string

  @Column('varchar', { name: 'id_rapbs', length: 22 })
  idRapbs: string

  @Column('varchar', { name: 'id_anggaran', length: 22 })
  idAnggaran: string

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

  @Column('varchar', { name: 'exp_updater_id', length: 22 })
  expUpdaterId: string

  @Column('numeric', { name: 'is_sah', nullable: true, precision: 1, scale: 0 })
  isSah: number | null

  @Column('varchar', { name: 'updater_id', nullable: true, length: 22 })
  updaterId: string | null
}
