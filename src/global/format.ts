export function format(theString: string, ...optionalParams: any[]) {
  const regex = /%s/
  const _r = function (p: string, c: any) {
    return p.replace(regex, c)
  }
  return optionalParams.reduce(_r, theString)
}
