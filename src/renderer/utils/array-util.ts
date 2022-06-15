export const findValueDeep: any = (object: any, name: string) => {
  const nested = name.split('.')
  const findName = name.replace(`${nested[0]}.`, '')

  if (nested.length > 3 || object[nested[0]] === undefined) {
    return {}
  }
  if (nested.length > 1) {
    return findValueDeep(object[nested[0]], findName)
  }

  return object[nested[0]]
}
