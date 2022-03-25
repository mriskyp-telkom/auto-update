import path from 'path'
import { Migrate, Config } from './migration'
import { createConnection } from 'typeorm'

test('MigrationRun', async () => {
  const cfg: Config = {
    migrationPath: path.join(__dirname, 'db', 'migrations'),
    seedPath: path.join(__dirname, 'db', 'seeds'),
  }

  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    synchronize: false,
    logging: false,
  })

  await Migrate(db, cfg)
})
