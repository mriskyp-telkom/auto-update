import { KasUmumNota } from 'main/models/KasUmumNota'
import { KasUmumNotaRepository } from 'main/repositories/KasUmumNotaRepository'
import { NamaToko } from 'main/types/TataUsaha'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

let kasUmumNotaRepo: KasUmumNotaRepository

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [KasUmumNota],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)

  kasUmumNotaRepo = new KasUmumNotaRepository(getConnection())
})

afterEach(async () => {
  const con = getConnection()
  await con.close()
})

test('GetTokoByName', async () => {
  const kasUmumNota: KasUmumNota = await kasUmumNotaRepo.GetTokoByName(
    'ADARA MAKMUR'
  )
  expect(kasUmumNota.namaToko).toBe('ADARA MAKMUR')
  expect(kasUmumNota.alamatToko).toBe(
    'Ngemplak, Kabupaten Sleman|||085742549494'
  )
  expect(kasUmumNota.npwp).toBe('90.655.179.1-542.000')
})

test('GetListToko', async () => {
  const res: NamaToko[] = await kasUmumNotaRepo.GetListToko()
  expect(res.length).toBe(5)
  expect(res[0].namaToko).toBe('ADARA MAKMUR')
  expect(res[1].namaToko).toBe('Berkah Santosa')
})
