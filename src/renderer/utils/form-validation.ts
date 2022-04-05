import {
  emailFormatRegex,
  emailValidationRegex,
  onlyNumberRegex,
} from 'renderer/constants/regex'

export const isFormatEmailValid = (value: string) => {
  if (emailFormatRegex.test(value)) {
    return true
  }
  return false
}

export const isEmailValid = (value: string) => {
  if (emailValidationRegex.test(value)) {
    return true
  }
  return false
}

export const isOnlyNumber = (value: string) => {
  if (onlyNumberRegex.test(value)) {
    return true
  }
  return false
}
