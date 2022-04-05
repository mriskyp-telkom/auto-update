import { getRepository, InsertResult, createQueryBuilder } from 'typeorm'
import { Token } from 'main/models/Token'

export const CreateToken = async (token: Token): Promise<InsertResult> => {
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

export const ExpiryToken = async (tokenId: string): Promise<void> => {
  await createQueryBuilder()
    .update(Token)
    .set({
      expiredDate: Date.now(),
    })
    .where('tokenId = :tokenId', { tokenId })
    .execute()
}
