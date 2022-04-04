import { emailRegex } from 'renderer/constants/regex'

export const isEmailValid = (value: string) => {
  if (!emailRegex.test(value)) {
    return false
  }
  return true
}
