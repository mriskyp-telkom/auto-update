import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'config_anggaran' })
export class ConfigAnggaran extends BaseEntity {
  @Column('uuid', { primary: true, name: 'sekolah_id' })
  sekolahId: NonNullable<unknown>

  @Column('numeric', {
    primary: true,
    name: 'id_ref_sumber_dana',
    precision: 2,
    scale: 0,
  })
  idRefSumberDana: number

  @Column('numeric', { name: 'is_allow_create', precision: 1, scale: 0 })
  isAllowCreate: number

  @Column('numeric', { name: 'is_allow_revisi', precision: 1, scale: 0 })
  isAllowRevisi: number

  @Column('numeric', { name: 'is_block_bku', precision: 1, scale: 0 })
  isBlockBku: number

  @Column('varchar', { name: 'keterangan', nullable: true, length: 2000 })
  keterangan: string | null
}
