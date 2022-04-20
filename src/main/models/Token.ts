import { BaseEntity, Column, Entity, Index } from 'typeorm'

@Index('FK_TOKEN_APP_FK', ['appId'], {})
@Index('FK_TOKEN_HISTORYJAB_FK', ['userroleId'], {})
@Entity({ name: 'token' })
export class Token extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'token_id',
    length: 22,
    unique: true,
  })
  tokenId: string

  @Column('varchar', { name: 'userrole_id', length: 22 })
  userroleId: string

  @Column('varchar', { name: 'app_id', length: 22 })
  appId: string

  @Column('varchar', { name: 'ipaddr', nullable: true, length: 30 })
  ipaddr: string | null

  @Column('varchar', { name: 'browser', nullable: true, length: 200 })
  browser: string | null

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
