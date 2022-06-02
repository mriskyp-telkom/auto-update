export function range(size: number, startAt = 0): Array<number> {
  return [...Array(size).keys()].map((i) => i + startAt)
}
