import moment from 'moment'

export function formatDateToString(date: Date, format = 'YYYY-MM-DD') {
  return moment(date).format(format)
}
