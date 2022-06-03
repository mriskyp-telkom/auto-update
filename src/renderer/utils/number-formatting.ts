import { numberUtils } from '@wartek-id/fe-toolbox'

export const amountFormatting = (amount: number) => {
  return `Rp ${numberUtils.delimit(amount, '.')}`
}

export const formattingToNumber = (data: string) => {
  return data.replace(/\D/g, '')
}
