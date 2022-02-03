import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('FK_APP_MANAGE_FK', ['appId'], {})
@Index('FK_PENGGUNA_MANAGE_FK', ['penggunaId'], {})
@Entity('manage_app')
export class ManageApp extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'manage_id',
    length: 22,
    unique: true,
  })
  manageId: string

  @Column('varchar', { name: 'pengguna_id', length: 22 })
  penggunaId: string

  @Column('varchar', { name: 'app_id', length: 22 })
  appId: string

  @Column('int', { name: 'is_superadmin', nullable: true })
  isSuperadmin: NonNullable<unknown> | null
}
