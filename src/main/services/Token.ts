import { getRepository, InsertResult } from 'typeorm'
import { Token } from '../repositories/Token'
import { IToken } from '../types/IToken'

export const CreateToken = async (token: IToken): Promise<InsertResult> => {
  return await getRepository(Token).insert({
    tokenId: token.tokenId,
    userroleId: token.userroleId,
    appId: token.appId,
    browser: token.browser,
    createDate: token.createDate,
    lastUpdate: token.lastUpdate,
    expiredDate: token.expiredDate,
  })
}
