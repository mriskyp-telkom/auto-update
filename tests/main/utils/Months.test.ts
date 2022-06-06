import { GetMonthDateRange, GetMonthsRange } from 'main/utils/Months'

test('GetMonthsRange', async () => {
  const months = GetMonthsRange(12)
  expect(months.length).toBe(12)
})

test('GetMonthDateRange', async () => {
  //0 = januari
  const dates = GetMonthDateRange(2022, 2)
  expect(dates.startDate.getDate()).toBe(1)
  expect(dates.endDate.getDate()).toBe(31)

  //tahun kabisat
  const dates2 = GetMonthDateRange(2020, 1)
  expect(dates2.startDate.getDate()).toBe(1)
  expect(dates2.endDate.getDate()).toBe(29)
})
