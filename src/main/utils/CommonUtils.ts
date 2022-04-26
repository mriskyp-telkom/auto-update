import crypto from 'crypto'
import { v4 } from 'uuid'
import moment from 'moment'

export default class CommonUtils {
  static uuid(): string {
    return v4()
  }

  static encodeUUIDFromV4(): string {
    try {
      const val = v4()
      const uint8Array = CommonUtils.uuidToUint8Array(val) as Uint8Array
      const base64Encoded = Buffer.from(uint8Array).toString('base64')
      let res = base64Encoded.slice(0, -2)
      const replacer = new RegExp('/', 'g')
      const replacer2 = new RegExp(/\+/, 'g')
      res = res.replace(replacer, '_')
      res = res.replace(replacer2, '-')
      return res
    } catch (e) {
      return null
    }
  }

  static encodeUUID(val: string): string {
    try {
      const uint8Array = CommonUtils.uuidToUint8Array(val) as Uint8Array
      const base64Encoded = Buffer.from(uint8Array).toString('base64')
      let res = base64Encoded.slice(0, -2)
      const replacer = new RegExp('/', 'g')
      const replacer2 = new RegExp(/\+/, 'g')
      res = res.replace(replacer, '_')
      res = res.replace(replacer2, '-')
      return res
    } catch (e) {
      return null
    }
  }

  static decodeUUID(val: string): string {
    try {
      const replacer = new RegExp('_', 'g')
      const replacer2 = new RegExp('-', 'g')
      let res = val.replace(replacer, '/')
      res = res.replace(replacer2, '+')
      const base64 = `${res}==`
      const uint8Array = new Uint8Array(Buffer.from(base64, 'base64'))
      return CommonUtils.stringify(uint8Array)
    } catch (e) {
      return null
    }
  }

  static getMD5(val: string): string {
    return crypto.createHash('md5').update(val).digest('hex')
  }

  static formatDateToString(date: Date, format = 'YYYY-MM-DD') {
    return moment(date).format(format)
  }

  private static uuidToUint8Array(uuid: string): Uint8Array {
    let v
    const arr = new Uint8Array(16) // Parse ########-....-....-....-............

    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24
    arr[1] = (v >>> 16) & 0xff
    arr[2] = (v >>> 8) & 0xff
    arr[3] = v & 0xff // Parse ........-####-....-....-............

    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8
    arr[5] = v & 0xff // Parse ........-....-####-....-............

    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8
    arr[7] = v & 0xff // Parse ........-....-....-####-............

    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8
    arr[9] = v & 0xff // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

    arr[10] = ((v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000) & 0xff
    arr[11] = (v / 0x100000000) & 0xff
    arr[12] = (v >>> 24) & 0xff
    arr[13] = (v >>> 16) & 0xff
    arr[14] = (v >>> 8) & 0xff
    arr[15] = v & 0xff
    return arr
  }

  private static stringify(arr: Uint8Array, offset = 0): string {
    const byteToHex = []
    for (let i = 0; i < 256; ++i) {
      byteToHex.push((i + 0x100).toString(16).substring(1))
    }
    return (
      byteToHex[arr[offset]] +
      byteToHex[arr[offset + 1]] +
      byteToHex[arr[offset + 2]] +
      byteToHex[arr[offset + 3]] +
      '-' +
      byteToHex[arr[offset + 4]] +
      byteToHex[arr[offset + 5]] +
      '-' +
      byteToHex[arr[offset + 6]] +
      byteToHex[arr[offset + 7]] +
      '-' +
      byteToHex[arr[offset + 8]] +
      byteToHex[arr[offset + 9]] +
      '-' +
      byteToHex[arr[offset + 10]] +
      byteToHex[arr[offset + 11]] +
      byteToHex[arr[offset + 12]] +
      byteToHex[arr[offset + 13]] +
      byteToHex[arr[offset + 14]] +
      byteToHex[arr[offset + 15]]
    ).toLowerCase() // Consistency check for valid UUID.  If this throws, it's likely due to one
  }
}
