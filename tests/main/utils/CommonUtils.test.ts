import CommonUtils from 'main/utils/CommonUtils'
import { validate } from 'uuid'

test('uuid', async () => {
  const uuid = CommonUtils.uuid()
  const isValid = validate(uuid)
  expect(isValid).toBe(true)
})

test('encodeUUID', async () => {
  const uuid = 'f02ac478-2ff5-e011-84d1-cfdbd42bda04'
  const encoded = CommonUtils.encodeUUID(uuid)
  expect(encoded).toBe('8CrEeC_14BGE0c_b1CvaBA')
})

test('decodeUUID', async () => {
  const decoded = '8CrEeC_14BGE0c_b1CvaBA'
  const decode = CommonUtils.decodeUUID(decoded)
  expect(decode).toBe('f02ac478-2ff5-e011-84d1-cfdbd42bda04')
})

test('getMD5', async () => {
  const val = 'password'
  const hash = CommonUtils.getMD5(val)
  expect(hash).toBe('5f4dcc3b5aa765d61d8327deb882cf99')
})

test('formatDateToString', async () => {
  const val = new Date('2022-01-01')
  const stringDate = CommonUtils.formatDateToString(val, 'YYYY-MM-DD')
  expect(stringDate).toBeDefined()
})
