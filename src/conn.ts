import path from 'path'
import { Connection, createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { getAppData } from './pathConfig'
import { checkExistsTable, entitiesDB } from './dbConfig'

// for make sure connection db
export const connDB = async (): Promise<Connection> => {
  try {
    const config: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      driver: require('better-sqlite3-multiple-ciphers'),
      database: path.join(await getAppData(), 'arkas.db'),
      prepareDatabase: (db) => {
        db.pragma(`cipher='sqlcipher'`)
        db.pragma(`legacy=4`)
        db.pragma(`key='K3md1kbudRIS3n4yan'`)
      },
      entities: entitiesDB,
      synchronize: true,
    }
    const c = await createConnection(config)
    await checkExistsTable()

    return c
  } catch (error) {
    console.error('Failed connect to db', error)
    return
  }
}
