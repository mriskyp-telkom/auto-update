import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('sekolah_penjab')
export class SekolahPenjab extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id_penjab',
    length: 22,
    unique: true,
  })
  idPenjab: string

  @Column('varchar', { name: 'sekolah_id', length: 22 })
  sekolahId: string

  @Column('date', { name: 'tanggal_mulai' })
  tanggalMulai: string

  @Column('date', { name: 'tanggal_selesai' })
  tanggalSelesai: string

  @Column('varchar', { name: 'ks', nullable: true, length: 50 })
  ks: string | null

  @Column('varchar', { name: 'nip_ks', nullable: true, length: 20 })
  nipKs: string | null

  @Column('varchar', { name: 'email_ks', nullable: true, length: 100 })
  emailKs: string | null

  @Column('varchar', { name: 'telp_ks', nullable: true, length: 20 })
  telpKs: string | null

  @Column('varchar', { name: 'bendahara', nullable: true, length: 50 })
  bendahara: string | null

  @Column('varchar', { name: 'nip_bendahara', nullable: true, length: 20 })
  nipBendahara: string | null

  @Column('varchar', { name: 'email_bendahara', nullable: true, length: 100 })
  emailBendahara: string | null

  @Column('varchar', { name: 'telp_bendahara', nullable: true, length: 20 })
  telpBendahara: string | null

  @Column('varchar', { name: 'komite', nullable: true, length: 50 })
  komite: string | null

  @Column('varchar', { name: 'nip_komite', nullable: true, length: 20 })
  nipKomite: string | null

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
