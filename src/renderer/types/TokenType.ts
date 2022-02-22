export interface TokenData {
  access_token: string
  token_type: string
  expires_in: number
  username: string
  issue: string
  expires: string
  errorDesc: string
}

export interface ParamTokenType {
  username: string
  password: string
}
