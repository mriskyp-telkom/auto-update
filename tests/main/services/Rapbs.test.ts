import { Rapbs } from 'main/repositories/Rapbs'
import { RapbsPeriode } from 'main/repositories/RapbsPeriode'
import { GetRapbsPeriodeDetail } from 'main/services/RapbsPeriode'
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
    entities: [Rapbs, RapbsPeriode],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(() => {
  const conn = getConnection()
  conn.close()
})

test('GetRapbsPeriodeDetail Service', async () => {
  const data = await GetRapbsPeriodeDetail(3, '02.', 'apQwiAb-9EWxv74iwMY6aQ')

  expect(data[0].rekening_belanja[0].label).toBe(
    'Belanja Makanan dan Minuman pada Fasilitas Pelayanan Urusan Pendidikan'
  )
  expect(data[0].rekening_belanja[0].uraian[0].label).toBe(
    'Belanja makan minum Workshop Peningkatan Kapasitas Guru'
  )
  expect(data[0].rekening_belanja[0].uraian[1].label).toBe(
    'Belanja minum snack Workshop Peningkatan Kapasitas Guru'
  )

  expect(data[0].rekening_belanja[1].label).toBe(
    'Honorarium Narasumber atau Pembahas, Moderator, Pembawa Acara, dan Panitia'
  )
  expect(data[0].rekening_belanja[1].uraian[0].label).toBe(
    'Belanja jasa nara sumber Workshop Peningkatan Kapasitas Guru'
  )
})
