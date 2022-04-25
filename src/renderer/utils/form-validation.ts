import { FieldErrors } from 'react-hook-form'

import {
  emailFormatRegex,
  emailValidationRegex,
  nameValidationRegex,
  onlyNumberRegex,
  onlyAlphabetWithSpaceRegex,
} from 'renderer/constants/regex'

import isEmpty from 'lodash/isEmpty'

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

export const isNameValid = (value: string) => {
  if (nameValidationRegex.test(value)) {
    return true
  }
  return false
}

export const btnFormDisabled = (errors: FieldErrors) => {
  if (!isEmpty(errors)) {
    return true
  }
  return false
}
