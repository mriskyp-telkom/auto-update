import { RapbsPtk } from 'main/models/RapbsPtk'
import {
  AddRapbsPtk,
  DeleteRapbsPtk,
  GetRapbsPtk,
  GetRapbsPtkHonor,
} from 'main/repositories/RapbsPtk'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [RapbsPtk],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('AddDeleteGetRapbsPtk', async () => {
  const now = new Date()
  const rapbsPtk = <RapbsPtk>{
    idRapbs: 'sjBrnFj9LkyYR6mx5uN7Ag',
    ptkId: 'ZhCzoPUuEeCu8uXpSNkwnA',
    nama: 'Test PTK',
    createDate: now,
    lastUpdate: now,
  }

  await AddRapbsPtk(rapbsPtk)

  const findRapbsPtk = await GetRapbsPtk(rapbsPtk.idRapbs)
  expect(findRapbsPtk.idRapbs).toBe(rapbsPtk.idRapbs)
  expect(findRapbsPtk.ptkId).toBe(rapbsPtk.ptkId)
  expect(findRapbsPtk.nama).toBe(rapbsPtk.nama)
})

test('DeleteGetRapbsPtk', async () => {
  const now = new Date()
  const rapbsPtk = <RapbsPtk>{
    idRapbs: 'sjBrnFj9LkyYR6mx5uN7Ag',
    ptkId: 'ZhCzoPUuEeCu8uXpSNkwnA',
    nama: 'Test PTK',
    createDate: now,
    lastUpdate: now,
  }

  await DeleteRapbsPtk(rapbsPtk.idRapbs, rapbsPtk.ptkId)

  const findRapbsPtk2 = await GetRapbsPtk(rapbsPtk.idRapbs)
  expect(findRapbsPtk2).toBe(undefined)
})

test('GetRapbsPtkHonor', async () => {
  const param: string[] = []
  const idRapbs = '8n-NMdSjb0yz6iuQ_eGN_A'
  param.push(idRapbs)

  const findRapbsPtkHonor = await GetRapbsPtkHonor(param)
  expect(findRapbsPtkHonor).toBeDefined()
})
