import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('ptk')
export class Ptk extends BaseEntity {
  @Column('varchar', { primary: true, name: 'sekolah_id', length: 22 })
  sekolahId: string

  @Column('varchar', { primary: true, name: 'ptk_id', length: 22 })
  ptkId: string

  @Column('int', { primary: true, name: 'tahun_ajaran_id' })
  tahunAjaranId: number

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('varchar', { name: 'jenis_kelamin', length: 1 })
  jenisKelamin: NonNullable<unknown>

  @Column('int', { name: 'masa_kerja_tahun' })
  masaKerjaTahun: number

  @Column('int', { name: 'masa_kerja_bulan' })
  masaKerjaBulan: number

  @Column('varchar', { name: 'nuptk', nullable: true, length: 16 })
  nuptk: string | null

  @Column('int', { name: 'jenis_ptk_arkas' })
  jenisPtkArkas: number

  @Column('int', { name: 'pernah_serfikasi' })
  pernahSerfikasi: number

  @Column('int', { name: 'is_cut_off' })
  isCutOff: number

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('int', { name: 'soft_delete' })
  softDelete: number
}
