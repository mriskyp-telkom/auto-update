import CommonUtils from 'main/utils/CommonUtils'
import { validate } from 'uuid'

test('uuid', async () => {
  const uuid = CommonUtils.uuid()
  const isValid = validate(uuid)
  expect(isValid).toBe(true)
})

test('encodeUUID - SMP NEGERI 1 PURWOSARI', async () => {
  const uuid = 'A0B4DE5C-2EF5-E011-BEBE-FDBF9613135D'
  const encoded = CommonUtils.encodeUUID(uuid)
  expect(encoded).toBe('XN60oPUuEeC-vv2_lhMTXQ')
})

test('decodeUUID - SMP NEGERI 1 PURWOSARI', async () => {
  const decoded = 'XN60oPUuEeC-vv2_lhMTXQ'
  const decode = CommonUtils.decodeUUID(decoded)
  expect(decode).toBe('A0B4DE5C-2EF5-E011-BEBE-FDBF9613135D'.toLowerCase())
})

test('encodeUUID - SDN Ngepoh Semin', async () => {
  const uuid = '20B6975C-2EF5-E011-A69A-0D1100F91E59'
  const encoded = CommonUtils.encodeUUID(uuid)
  expect(encoded).toBe('XJe2IPUuEeCmmg0RAPkeWQ')
})

test('decodeUUID - SDN Ngepoh Semin', async () => {
  const decoded = 'XJe2IPUuEeCmmg0RAPkeWQ'
  const decode = CommonUtils.decodeUUID(decoded)
  expect(decode).toBe('20B6975C-2EF5-E011-A69A-0D1100F91E59'.toLowerCase())
})

test('encodeUUID - SDN GEDANGAN KARANGMOJO', async () => {
  const uuid = 'A0A1955C-2EF5-E011-8DD8-0999FF6556B8'
  const encoded = CommonUtils.encodeUUID(uuid)
  expect(encoded).toBe('XJWhoPUuEeCN2AmZ_2VWuA')
})

test('decodeUUID - SDN GEDANGAN KARANGMOJO', async () => {
  const decoded = 'XJWhoPUuEeCN2AmZ_2VWuA'
  const decode = CommonUtils.decodeUUID(decoded)
  expect(decode).toBe('A0A1955C-2EF5-E011-8DD8-0999FF6556B8'.toLowerCase())
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
