import path from 'path'
import { Connection, createConnection } from 'typeorm'
import { BetterSqlite3ConnectionOptions } from 'typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions'
import { getAppData } from './pathConfig'
import { getEntities, dbPragmaConfigDefault, dbFile } from './dbUtil'

// for make sure connection db
export const connDB = async (): Promise<Connection> => {
  try {
    const config: BetterSqlite3ConnectionOptions = {
      type: 'better-sqlite3',
      database: path.join(await getAppData(), dbFile()),
      entities: getEntities(),
      driver: require('better-sqlite3-multiple-ciphers'),
      prepareDatabase: (db) => {
        dbPragmaConfigDefault(db, false)
      },
    }
    return await createConnection(config)
  } catch (error) {
    console.error('Failed connect to db', error)
    return
  }
}
