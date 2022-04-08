import moment from 'moment'
import 'moment/locale/id'

moment.locale('id')

import { FORMAT_TANGGAL } from 'renderer/constants/general'

export function formatDateToString(date: Date, format = FORMAT_TANGGAL) {
  return moment(date).format(format)
}

export function dateToString(date: Date, format: string) {
  return moment(date).format(format)
}

export function formatDateTimeStatus(date: Date) {
  const dateStatus = moment(date).format('YYYY-MM-DD')
  const today = moment(new Date()).format('YYYY-MM-DD')
  const isSame = moment(today).isSame(dateStatus)

  if (isSame) {
    return formatDateToString(date, 'k:mm')
  }
  return formatDateToString(date)
}
