export interface IToken {
  tokenId: string
  userroleId: string
  appId: string
  ipaddr: string
  browser: string
  createDate: Date
  lastUpdate: Date
  expiredDate: Date | null
}
