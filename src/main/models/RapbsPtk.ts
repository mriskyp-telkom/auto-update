import { BaseEntity, Column, Entity } from 'typeorm'

@Entity({ name: 'rapbs_ptk' })
export class RapbsPtk extends BaseEntity {
  @Column('varchar', { primary: true, name: 'id_rapbs', length: 22 })
  idRapbs: string

  @Column('varchar', { primary: true, name: 'ptk_id', length: 22 })
  ptkId: string

  @Column('varchar', { name: 'nama', nullable: true, length: 80 })
  nama: string | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date
}
