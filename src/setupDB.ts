import fs from 'fs'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { createConnection } from 'typeorm'
import { getAppData } from './pathConfig'

import { initData, getEntities, dbPragmaConfigDefault, dbFile } from './dbUtil'

async function encryptDB(): Promise<void> {
  const appData = await getAppData()
  const appDataPath = path.join(appData, dbFile())
  /* eslint @typescript-eslint/no-var-requires: "off" */
  const db = require('better-sqlite3-multiple-ciphers')(appDataPath)
  try {
    dbPragmaConfigDefault(db, true)
    db.close()
  } catch {
    dbPragmaConfigDefault(db, false)
    db.close()
  }
  return
}

async function createDBLocal(appDataPath: string): Promise<void> {
  if (!fs.existsSync(path.join(appDataPath, dbFile()))) {
    const connDBLocal = await createConnection({
      type: 'better-sqlite3',
      database: path.join(appDataPath, dbFile()),
      entities: getEntities(),
      synchronize: true,
    })

    await initData.insert()
    // check also conn.ts
    await connDBLocal.close()
  }

  await encryptDB()
  return
}

export const setupDB = async (): Promise<void> => {
  const appDataPath = await getAppData()

  if (!fs.existsSync(appDataPath)) {
    fs.mkdirSync(appDataPath)
  }

  if (
    process.platform == 'win32' &&
    !fs.existsSync(path.join(appDataPath, dbFile()))
  ) {
    let paramStr = ''
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
      paramStr = ''
    } else {
      paramStr = path.join(appDataPath, dbFile())
    }
    const execPromisify = promisify(execFile)
    return execPromisify(
      path.join(__dirname, 'convert', 'ConvertArkasToVer4.exe'),
      [paramStr]
    )
      .then(() => {
        return createDBLocal(appDataPath)
      })
      .catch((err) => {
        throw err
      })
  } else {
    await createDBLocal(appDataPath)
    return
  }
}
