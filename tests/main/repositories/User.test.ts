import { Anggaran } from 'main/models/Anggaran'
import { AppConfig } from 'main/models/AppConfig'
import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { Instansi } from 'main/models/Instansi'
import { MstSekolah } from 'main/models/MstSekolah'
import { MstWilayah } from 'main/models/MstWilayah'
import { Pengguna } from 'main/models/Pengguna'
import { Token } from 'main/models/Token'
import { UserRole } from 'main/models/UserRole'
import CommonUtils from 'main/utils/CommonUtils'

import {
  CheckUser,
  CheckUserPass,
  CheckLogin,
  GetUserRole,
  GetPenggunaByEmail,
  GetPenggunaByToken,
  AddPengguna,
} from 'main/repositories/UserRepository'
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
    entities: [
      Anggaran,
      AppConfig,
      Instansi,
      InstansiPengguna,
      MstSekolah,
      MstWilayah,
      Pengguna,
      Token,
      UserRole,
    ],
    synchronize: false,
    logging: true,
  })

  await Migrate(db, cfg)
})

afterEach(async () => {
  const con = getConnection()

  await con.close()
})

test('CheckUser', async () => {
  const userIsExist = await CheckUser('wasidi117@gmail.com')

  expect(userIsExist).toBe(true)
})

test('CheckUserPass', async () => {
  const passwordIsCorrect = await CheckUserPass(
    'wasidi117@gmail.com',
    '12345678'
  )

  expect(passwordIsCorrect).toBe(true)
})

test('CheckLogin', async () => {
  const checkLogin = await CheckLogin()

  expect(checkLogin).toBe(2)
})

test('GetUserRole', async () => {
  const username = 'wasidi117@gmail.com'
  const checkUserRole = await GetUserRole(username)

  expect(checkUserRole.instansiPenggunaId).toBe('mR0QnRogkk2u4j9B048RTg')
  expect(checkUserRole.roleId).toBe('kG0LFX0OXEuso0DtvGmniw')
  expect(checkUserRole.userroleId).toBe('2idmFXmV9kuKH1qUVOrIdg')
})

test('GetPenggunaByEmail', async () => {
  const username = 'wasidi117@gmail.com'
  const data = await GetPenggunaByEmail(username)

  expect(data.penggunaId).toBe('pUe9yWUZHkmYezDiz7DTDA')
  expect(data.nip).toBe('0')
  expect(data.nama).toBe('WASIDI')
  expect(data.email).toBe('wasidi117@gmail.com')
  expect(data.updaterId).toBe('EREREQAA__-Zmf_______w')
})

test('GetPenggunaByToken', async () => {
  const tokenId = CommonUtils.encodeUUIDFromV4()
  const data = await GetPenggunaByToken(tokenId)

  expect(data).toBe(undefined)
})

test('AddPengguna', async () => {
  const newDate = new Date()
  const pengguna = new Pengguna()
  pengguna.penggunaId = 'pUe9yWUZHkmYezDiz7DTDB'
  pengguna.nama = 'wasidi'
  pengguna.jenisKelamin = 'L'
  pengguna.tanggalLahir = new Date('2017-02-14')
  pengguna.tempatLahir = 'abcd'
  pengguna.email = 'wasidi117@gmail.com'
  pengguna.password = 'abcd'
  pengguna.createDate = newDate
  pengguna.lastUpdate = newDate
  pengguna.updaterId = 'EREREQAA__-Zmf_______w'
  pengguna.softDelete = 0
  pengguna.statusApproval = 0
  const insertResult = await AddPengguna(pengguna)

  // check generated maps
  const data = insertResult.generatedMaps
  expect(data.length).toBeGreaterThan(0)
})
