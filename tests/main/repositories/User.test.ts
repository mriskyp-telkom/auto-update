import { Instansi } from 'main/models/Instansi'
import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { MstWilayah } from 'main/models/MstWilayah'
import { Pengguna } from 'main/models/Pengguna'
import { UserRole } from 'main/models/UserRole'
import { CheckUser, CheckUserPass } from 'main/repositories/User'
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
