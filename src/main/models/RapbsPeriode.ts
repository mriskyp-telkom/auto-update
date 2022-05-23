import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('REL_RAPBS_PERIODE_FK', ['idRapbs'], {})
@Index('REL_PERIODE_FK', ['idPeriode'], {})
@Entity('rapbs_periode')
export class RapbsPeriode extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_rapbs_periode',
    length: 22,
    unique: true,
  })
  idRapbsPeriode: string

  @Column('varchar', { name: 'id_rapbs', length: 22 })
  idRapbs: string

  @Column('numeric', { name: 'id_periode', precision: 2, scale: 0 })
  idPeriode: number

  @Column('numeric', { name: 'volume', precision: 6, scale: 0 })
  volume: number

  @Column('varchar', { name: 'satuan', length: 30 })
  satuan: string

  @Column('numeric', { name: 'harga_satuan' })
  hargaSatuan: NonNullable<number>

  @Column('numeric', { name: 'jumlah' })
  jumlah: NonNullable<number>

  @Column('numeric', { name: 'v1', nullable: true, precision: 4, scale: 0 })
  v1: number | null

  @Column('varchar', { name: 's1', nullable: true, length: 30 })
  s1: string | null

  @Column('numeric', { name: 'v2', nullable: true, precision: 4, scale: 0 })
  v2: number | null

  @Column('varchar', { name: 's2', nullable: true, length: 30 })
  s2: string | null

  @Column('numeric', { name: 'v3', nullable: true, precision: 4, scale: 0 })
  v3: number | null

  @Column('varchar', { name: 's3', nullable: true, length: 30 })
  s3: string | null

  @Column('numeric', { name: 'v4', nullable: true, precision: 4, scale: 0 })
  v4: number | null

  @Column('varchar', { name: 's4', nullable: true, length: 30 })
  s4: string | null

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

  @Column('varchar', { name: 'updater_id', nullable: true, length: 22 })
  updaterId: string | null
}
