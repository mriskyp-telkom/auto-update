import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('app')
export class App extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'app_id',
    length: 22,
    unique: true,
  })
  appId: string

  @Column('varchar', { name: 'nama', length: 80 })
  nama: string

  @Column('varchar', { name: 'url_login', length: 255 })
  urlLogin: string

  @Column('varchar', { name: 'url_post', length: 255 })
  urlPost: string

  @Column('varchar', { name: 'login_info', nullable: true, length: 500 })
  loginInfo: string | null

  @Column('int', { name: 'tag' })
  tag: number

  @Column('datetime', { name: 'create_date' })
  createDate: Date

  @Column('datetime', { name: 'last_update' })
  lastUpdate: Date

  @Column('datetime', { name: 'expired_date', nullable: true })
  expiredDate: Date | null
}
