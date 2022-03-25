import fs from 'fs'
import path from 'path'
import { Connection } from 'typeorm'

export interface Config {
  migrationPath: string
  seedPath: string
}

export interface Migrations {
  migrationQueries: Query[]
  seedQueries: Query[]
}

export interface Query {
  fileName: string
  query: string[]
}

export async function Migrate(db: Connection, config: Config) {
  const migrations: Migrations = {
    migrationQueries: readDirectory(config.migrationPath),
    seedQueries: readDirectory(config.seedPath),
  }

  await runQueries(db, migrations.migrationQueries)
  await runQueries(db, migrations.seedQueries)
}

async function runQueries(db: Connection, queries: Query[]) {
  const em = db.createEntityManager()
  queries.forEach((q) => {
    console.log('execute sql file:', q.fileName)
    q.query.forEach(async (sql) => {
      await em.query(sql)
    })
  })
}

function readDirectory(dir: string): Query[] {
  const queries: Query[] = []
  fs.readdirSync(dir).forEach((fileName) => {
    const file = path.join(dir, fileName)
    const content = fs
      .readFileSync(file, 'utf8')
      .toString()
      .replace(/\r?\n|\r/g, '')
    if (content != '') {
      const contents = content.split(';')
      const q: string[] = []

      contents.forEach((c) => {
        if (c != '') {
          q.push(c)
        }
      })

      queries.push({ fileName: fileName, query: q })
    }
  })

  return queries
}

export const cfg: Config = {
  migrationPath: path.join(__dirname, 'db', 'migrations'),
  seedPath: path.join(__dirname, 'db', 'seeds'),
}
