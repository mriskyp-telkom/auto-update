import { Instansi } from 'main/models/Instansi'
import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { MstWilayah } from 'main/models/MstWilayah'
import { Pengguna } from 'main/models/Pengguna'
import { UserRole } from 'main/models/UserRole'
import { AddInstansiPengguna } from 'main/repositories/InstansiPengguna'
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
    entities: [MstWilayah, Instansi, InstansiPengguna, Pengguna, UserRole],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('AddInstansiPengguna', async () => {
  const dataInstansiPengguna = new InstansiPengguna()
  dataInstansiPengguna.instansiPenggunaId = 'fqrYww_0p0W7mF0GCksfka'
  dataInstansiPengguna.penggunaId = 'A-miBPPeP0m2UQaNDV6DHB'
  dataInstansiPengguna.instansiId = 'RF8ExGeBk0ewknCtEPAkWQ'
  dataInstansiPengguna.jabatanId = 1
  dataInstansiPengguna.sk = '-'
  dataInstansiPengguna.tanggalSk = new Date()
  dataInstansiPengguna.softDelete = 0
  dataInstansiPengguna.createDate = new Date()
  dataInstansiPengguna.lastUpdate = new Date()
  dataInstansiPengguna.updaterId = 'abcd'

  const insertResult = await AddInstansiPengguna(dataInstansiPengguna)
  // check generated maps
  const data = insertResult.generatedMaps
  // console.log(data)
  expect(data.length).toBeGreaterThan(0)
})
