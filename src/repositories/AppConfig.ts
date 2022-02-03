import { BaseEntity, Column, Entity } from 'typeorm'

@Entity('app_config')
export class AppConfig extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'varname',
    length: 50,
    unique: true,
  })
  varname: string

  @Column('varchar', { name: 'varvalue', length: 255 })
  varvalue: string
}
