import { Tanggal } from 'global/date'
import { KasUmum } from 'main/models/KasUmum'
import moment from 'moment'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [KasUmum],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('Tanggal', async () => {
  const asd = new Tanggal()
  asd
  const mome = moment()

  const myNewDate = new Date(mome.toDate().getTime() + 60000 * 420)

  const now = myNewDate
  const idAnggaran = 'anggaran-1'
  const seedKasUmum = new KasUmum({
    idAnggaran: idAnggaran,
    idKasUmum: 'idKasUmum-1',
    idRapbsPeriode: 'idRapbsPeriode-1',
    volume: 3000,
    saldo: 1000,
    idRefBku: 4,
    tanggalTransaksi: now,
    uraian: 'uraian',
    createDate: now,
    lastUpdate: now,
  })

  const conn = getConnection()

  await conn.getRepository(KasUmum).insert(seedKasUmum)

  const oio = await conn
    .getRepository(KasUmum)
    .findOne({ idKasUmum: 'idKasUmum-1' })
  oio
})
