const mapBulan = new Map()
  .set(81, 'januari')
  .set(82, 'febuari')
  .set(83, 'maret')
  .set(84, 'april')
  .set(85, 'mei')
  .set(86, 'juni')
  .set(87, 'juli')
  .set(88, 'agustus')
  .set(89, 'september')
  .set(90, 'oktober')
  .set(91, 'november')
  .set(92, 'desember')

export function GetMonth(id: number): string {
  return mapBulan.get(id)
}
