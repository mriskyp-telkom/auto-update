import { GetMonthsRange } from 'main/utils/Months'

test('GetMonthsRange', async () => {
  const months = GetMonthsRange(12)
  expect(months.length).toBe(12)
})
