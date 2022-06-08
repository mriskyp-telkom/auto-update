import { InformasiToko } from 'global/types/BuktiBelanjaType'
import { KasUmumNota } from 'main/models/KasUmumNota'
import { BuktiBelanjaService } from 'main/services/BuktiBelanjaService'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: true,
    entities: [KasUmumNota],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const conn = getConnection()
  await conn.close()
})

test('GetInformasiToko', async () => {
  const conn = getConnection()
  const buktiBelanjaService = new BuktiBelanjaService(conn)

  const res = await buktiBelanjaService.GetInformasiToko('ADARA MAKMUR')
  expect(res.isOk()).toBe(true)

  const tokoAdaraMakmur = res.unwrapOr(<InformasiToko>{})
  expect(tokoAdaraMakmur.nama).toBe('ADARA MAKMUR')
  expect(tokoAdaraMakmur.npwp).toBe('90.655.179.1-542.000')
  expect(tokoAdaraMakmur.alamat).toBe('Ngemplak, Kabupaten Sleman')
  expect(tokoAdaraMakmur.telpon).toBe('085742549494')

  const res2 = await buktiBelanjaService.GetInformasiToko('CV. ACITYA')
  expect(res2.isOk()).toBe(true)

  const tokoACITYA = res2.unwrapOr(<InformasiToko>{})
  expect(tokoACITYA.nama).toBe('CV. ACITYA')
  expect(tokoACITYA.npwp).toBe('41.294.835.8-545.000')
  expect(tokoACITYA.alamat).toBe(
    'Jl. Wonosari-Karangmojo, Selang 1, Selang,Wonosari'
  )
  expect(tokoACITYA.telpon).toBe('02115221')
})
