import { GetConfig, SetConfig } from 'main/repositories/Config'
import { GetPenggunaByToken } from 'main/repositories/User'
import CommonUtils from 'main/utils/CommonUtils'
import { CONFIG } from 'global/constants'

export async function GetPenggunaID(): Promise<string> {
  let penggunaId = await GetConfig(CONFIG.penggunaId)
  if (penggunaId === '') {
    const sessionId = await GetConfig(CONFIG.sessionId)
    const tokenId = CommonUtils.decodeUUID(sessionId)

    const pengguna = await GetPenggunaByToken(tokenId)
    penggunaId = pengguna.penggunaId

    await SetConfig(CONFIG.penggunaId, penggunaId)
  }

  return penggunaId
}
