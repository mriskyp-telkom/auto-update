import { numberUtils } from '@wartek-id/fe-toolbox'

export const amountFormatting = (amount: number) => {
  return `Rp ${numberUtils.delimit(amount, '.')}`
}
