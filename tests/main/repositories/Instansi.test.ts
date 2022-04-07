import { Instansi } from 'main/models/Instansi'
import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { MstWilayah } from 'main/models/MstWilayah'
import { Pengguna } from 'main/models/Pengguna'
import { UserRole } from 'main/models/UserRole'
import { AddInstansi } from 'main/repositories/Instansi'
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
    entities: [Instansi, InstansiPengguna, MstWilayah, Pengguna, UserRole],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('AddInstansi', async () => {
  const newDate = new Date()
  const datainstansi = new Instansi()
  datainstansi.instansiId = 'RF8ExGeBk0ewknCtEPAkWQ'
  datainstansi.insInstansiId = null
  datainstansi.jenisInstansiId = 3
  datainstansi.kodeInstansi = 'DN040300'
  datainstansi.nama =
    'Dinas Pendidikan dan Pemuda Olahraga Kabupaten Gunung Kidul'
  datainstansi.alamat = 'Jl. Pemuda'
  datainstansi.kodePos = 0
  datainstansi.kodeWilayah = 0
  datainstansi.lintang = 0
  datainstansi.bujur = 0
  datainstansi.email = ''
  datainstansi.telepon = ''
  datainstansi.fax = ''
  datainstansi.website = ''
  datainstansi.tag = 0
  datainstansi.softDelete = 0
  datainstansi.createDate = newDate
  datainstansi.lastUpdate = newDate
  datainstansi.updaterId = 'abcd'

  const insertResult = await AddInstansi(datainstansi)
  // expect(data.identifiers[i].varname).toBe()
  // check generated maps
  const data = insertResult.generatedMaps

  expect(data.length).toBeGreaterThan(0)
})
