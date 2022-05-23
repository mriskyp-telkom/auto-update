export default class ConvertUtils {
  static convertIntoNumber(val: any): number {
    return <number>(<unknown>val)
  }
  static convertIntoString(val: any): string {
    return <string>(<unknown>val)
  }

  static convertIntoBoolean(val: any): boolean {
    return <boolean>(<unknown>val)
  }
}
