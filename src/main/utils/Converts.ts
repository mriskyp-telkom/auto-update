export default class ConvertUtils {
  static convertIntoNumber(val: any): number {
    return <number>(<unknown>val)
  }
  static convertIntoString(val: any): string {
    return <string>(<unknown>val)
  }
}
