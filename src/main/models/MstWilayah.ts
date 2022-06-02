import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('PARENT_WILAYAH_FK', ['mstKodeWilayah'], {})
@Index('LEVEL_WILAYAH_FK', ['idLevelWilayah'], {})
@Index('PROPINSI_NEGARA_FK', ['negaraId'], {})
@Entity('mst_wilayah')
export class MstWilayah extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'kode_wilayah',
    length: 8,
    unique: true,
  })
  kodeWilayah: NonNullable<string>

  @Column('varchar', { name: 'mst_kode_wilayah', nullable: true, length: 8 })
  mstKodeWilayah: string | null

  @Column('varchar', { name: 'negara_id', length: 2 })
  negaraId: NonNullable<string>

  @Column('smallint', { name: 'id_level_wilayah' })
  idLevelWilayah: number

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('varchar', { name: 'asal_wilayah', nullable: true, length: 8 })
  asalWilayah: string | null

  @Column('varchar', { name: 'kode_bps', nullable: true, length: 7 })
  kodeBps: string | null

  @Column('varchar', { name: 'kode_dagri', nullable: true, length: 7 })
  kodeDagri: string | null

  @Column('varchar', { name: 'kode_keu', nullable: true, length: 10 })
  kodeKeu: string | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
