import { numberUtils } from '@wartek-id/fe-toolbox'

export const amountFormatting = (amount: number) => {
  return `Rp ${numberUtils.delimit(amount, '.')}`
}

export const formattingToNumber = (data: string) => {
  return data.replace(/\D/g, '')
}

export const formatNIP = (value: string) => {
  // 99999999.999999.9.999
  return value != null
    ? value
        .replace(/\D/g, '')
        .replace(/(\d{15})(\d)/, '$1.$2')
        .replace(/(\d{14})(\d)/, '$1.$2')
        .replace(/(\d{8})(\d)/, '$1.$2')
    : ''
}

export const formatNPWP = (value: string) => {
  // 99.999.999.9-999.999
  return value != null
    ? value
        .replace(/\D/g, '')
        .replace(/(\d{12})(\d)/, '$1.$2')
        .replace(/(\d{9})(\d)/, '$1-$2')
        .replace(/(\d{8})(\d)/, '$1.$2')
        .replace(/(\d{5})(\d)/, '$1.$2')
        .replace(/(\d{2})(\d)/, '$1.$2')
    : ''
}
