const mapMonth = new Map()
  .set(81, <Month>{ id: 81, name: 'januari', monthNumber: 0 })
  .set(82, <Month>{ id: 82, name: 'februari', monthNumber: 1 })
  .set(83, <Month>{ id: 83, name: 'maret', monthNumber: 2 })
  .set(84, <Month>{ id: 84, name: 'april', monthNumber: 3 })
  .set(85, <Month>{ id: 85, name: 'mei', monthNumber: 4 })
  .set(86, <Month>{ id: 86, name: 'juni', monthNumber: 5 })
  .set(87, <Month>{ id: 87, name: 'juli', monthNumber: 6 })
  .set(88, <Month>{ id: 88, name: 'agustus', monthNumber: 7 })
  .set(89, <Month>{ id: 89, name: 'september', monthNumber: 8 })
  .set(90, <Month>{ id: 90, name: 'oktober', monthNumber: 9 })
  .set(91, <Month>{ id: 91, name: 'november', monthNumber: 10 })
  .set(92, <Month>{ id: 92, name: 'desember', monthNumber: 11 })

export const MonthList: Month[] = [
  mapMonth.get(81),
  mapMonth.get(82),
  mapMonth.get(83),
  mapMonth.get(84),
  mapMonth.get(85),
  mapMonth.get(86),
  mapMonth.get(87),
  mapMonth.get(88),
  mapMonth.get(89),
  mapMonth.get(90),
  mapMonth.get(91),
  mapMonth.get(92),
]

export function GetMonthName(id: number): string {
  return mapMonth.get(id)?.name
}

export interface Month {
  id: number
  name: string
  monthNumber: number
}

export function GetPeriode(periode: number): Month[] {
  switch (periode) {
    case 1:
      return [mapMonth.get(81), mapMonth.get(82), mapMonth.get(83)]
    case 2:
      return [
        mapMonth.get(84),
        mapMonth.get(85),
        mapMonth.get(86),
        mapMonth.get(87),
        mapMonth.get(88),
      ]
    case 3:
      return [
        mapMonth.get(89),
        mapMonth.get(90),
        mapMonth.get(91),
        mapMonth.get(92),
      ]
    default:
      return []
  }
}

export function GetMonthsRange(month: number): Month[] {
  if (month > 12) {
    return []
  }

  const months: Month[] = []
  for (let i = 0; i < month; i++) {
    months.push(MonthList[i])
  }

  return months
}
