export interface HDDVolData {
  access_token: string
  token_type: string
  expires_in: number
  username: string
  issue: string
  expires: string
  errorDesc: string
}

export interface ParamHDDVolType {
  hdd_vol: string
  hdd_vol_old: string
}

export interface ParamCheckActivation {
  npsn: string
  koreg: string
  hdd_vol: string
}
