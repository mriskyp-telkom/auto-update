import { Instansi } from 'main/repositories/Instansi'
import { InstansiPengguna } from 'main/repositories/InstansiPengguna'
import { MstWilayah } from 'main/repositories/MstWilayah'
import { Pengguna } from 'main/repositories/Pengguna'
import { UserRole } from 'main/repositories/UserRole'
import { CheckUser, CheckUserPass } from 'main/services/User'
// import { CheckUser } from 'main/services/User'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [Pengguna, InstansiPengguna, UserRole, Instansi, MstWilayah],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(() => {
  const conn = getConnection()
  conn.close()
})

test('CheckUser', async () => {
  const userIsExist = await CheckUser('wasidi117@gmail.com')
  expect(userIsExist).toBe(true)
})

test('CheckUserPass', async () => {
  const passwordIsCorret = await CheckUserPass(
    'wasidi117@gmail.com',
    '12345678'
  )
  expect(passwordIsCorret).toBe(true)
})
