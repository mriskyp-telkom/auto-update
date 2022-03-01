import crypto from 'crypto'
import { decode, encode } from 'uuid-base64-ts'
import { v4 } from 'uuid'
import moment from 'moment'

export default class CommonUtils {
  static uuid(): string {
    return v4()
  }
  static encodeUUID(val: string): string {
    return encode(val)
  }
  static decodeUUID(val: string): string {
    return decode(val)
  }
  static getMD5(val: string): string {
    return crypto.createHash('md5').update(val).digest('hex')
  }

  static formatDateToString(date: Date, format = 'YYYY-MM-DD') {
    return moment(date).format(format)
  }
}
