import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('REL_TAHUN_RKA_FK', ['idRefTahunAnggaran'], {})
@Index('REL_SUMER_RKA_FK', ['idAnggaran'], {})
@Index('REL_KODE_RKA_FK', ['idRefKode'], {})
@Index('REL_INSTANSI_RKA_FK', ['instansiId'], {})
@Entity('rencana_kerja_anggaran')
export class RencanaKerjaAnggaran extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_rka',
    length: 22,
    unique: true,
  })
  idRka: string

  @Column('varchar', { name: 'id_ref_kode', length: 22 })
  idRefKode: string

  @Column('varchar', { name: 'instansi_id', length: 22 })
  instansiId: string

  @Column('varchar', { name: 'id_anggaran', length: 22 })
  idAnggaran: string

  @Column('numeric', { name: 'id_ref_tahun_anggaran', precision: 4, scale: 0 })
  idRefTahunAnggaran: number

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
