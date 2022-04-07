import { Token } from 'main/models/Token'
import { CreateToken, ExpiryToken } from 'main/repositories/Token'
import { createConnection, getConnection } from 'typeorm'
import { cfg, Migrate } from '../migration'
import CommonUtils from 'main/utils/CommonUtils'

beforeAll(async () => {
  process.env.NODE_ENV = 'testing'
})

beforeEach(async () => {
  const db = await createConnection({
    type: 'better-sqlite3',
    database: ':memory:',
    dropSchema: false,
    entities: [Token],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('CreateToken', async () => {
  const tokenData = new Token()

  tokenData.tokenId = CommonUtils.encodeUUID(CommonUtils.uuid())
  tokenData.userroleId = '2idmFXmV9kuKH1qUVOrIdg'
  tokenData.appId = 'CNhMM6obP06_yBqZAw2PZg'
  tokenData.ipaddr = ''
  tokenData.browser = ''
  tokenData.createDate = new Date()
  tokenData.lastUpdate = new Date()
  const insertResult = await CreateToken(tokenData)

  // check generated maps
  const data = insertResult.generatedMaps
  expect(data.length).toBeGreaterThan(0)
})

test('ExpiryToken', async () => {
  const tokenId = 'VZBc9BVFJ0GGuvZOuWPzcQ'
  // Promise<void> unit test
  await expect(ExpiryToken(tokenId)).resolves.toBe(undefined)
})
