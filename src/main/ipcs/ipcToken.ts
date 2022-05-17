import { ipcMain } from 'electron'
import { CreateToken, ExpiryToken } from 'main/repositories/Token'
import { GetPenggunaByEmail, GetUserRole } from 'main/repositories/User'
import { SetConfig, GetConfig, DeleteConfig } from 'main/repositories/Config'
import { Token } from 'main/models/Token'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  createSession: ipcMain.on('token:createSession', async (e, username) => {
    const user = await GetUserRole(username)
    const pengguna = await GetPenggunaByEmail(username)
    const uuid = CommonUtils.uuid()
    const token = new Token()
    token.tokenId = CommonUtils.encodeUUID(uuid)
    token.userroleId = user.userroleId
    token.appId = 'CNhMM6obP06_yBqZAw2PZg'
    token.ipaddr = ''
    token.browser = ''
    token.createDate = new Date()
    token.lastUpdate = new Date()
    await CreateToken(token)
    SetConfig('sessionId', uuid).catch()
    SetConfig('pengguna_id', pengguna.penggunaId).catch()
    e.returnValue = uuid
  }),

  expirySession: ipcMain.on('token:expiryToken', async (e) => {
    try {
      const token = await GetConfig('sessionId')
      const tokenId = CommonUtils.decodeUUID(token)
      await ExpiryToken(tokenId)
      await DeleteConfig('sessionId')
      e.returnValue = true
    } catch (e) {
      e.returnValue = false
    }
  }),

  isUserLoggedIn: ipcMain.on('token:isUserLoggedIn', async (e) => {
    try {
      const token = await GetConfig('sessionId')
      e.returnValue = token !== null && token !== undefined && token !== ''
    } catch (e) {
      e.returnValue = false
    }
  }),
}
