import {
  emailFormatRegex,
  emailValidationRegex,
  onlyNumberRegex,
  onlyAlphabetWithSpaceRegex,
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

export const isOnlyAlphabet = (value: string) => {
  if (onlyAlphabetWithSpaceRegex.test(value)) {
    return true
  }
  return false
}
