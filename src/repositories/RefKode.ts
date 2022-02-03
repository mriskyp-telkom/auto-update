import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('REL_JENIS_KODE_FK', ['idLevelKode'], {})
@Index('RECURSIVE_KODE_FK', ['parentKode'], {})
@Entity('ref_kode')
export class RefKode extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_ref_kode',
    length: 22,
    unique: true,
  })
  idRefKode: string

  @Column('varchar', { name: 'id_kode', length: 12 })
  idKode: string

  @Column('varchar', { name: 'parent_kode', nullable: true, length: 22 })
  parentKode: string | null

  @Column('varchar', { name: 'uraian_kode', length: 200 })
  uraianKode: string

  @Column('numeric', { name: 'is_bos_pusat', precision: 1, scale: 0 })
  isBosPusat: number

  @Column('numeric', { name: 'is_bos_prop', precision: 1, scale: 0 })
  isBosProp: number

  @Column('numeric', { name: 'is_bos_kab', precision: 1, scale: 0 })
  isBosKab: number

  @Column('numeric', { name: 'is_komite', precision: 1, scale: 0 })
  isKomite: number

  @Column('numeric', { name: 'is_lainnnya', precision: 1, scale: 0 })
  isLainnnya: number

  @Column('numeric', { name: 'id_level_kode', precision: 2, scale: 0 })
  idLevelKode: number

  @Column('numeric', {
    name: 'bentuk_pendidikan_id',
    precision: 2,
    scale: 0,
  })
  bentukPendidikanId: number

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
