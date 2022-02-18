import { ipcMain } from 'electron'
import { CreateToken, ExpiryToken } from 'main/services/Token'
import { GetUserRole } from 'main/services/User'
import { SetConfig, GetConfig } from 'main/services/Config'
import { Token } from 'main/repositories/Token'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  createSession: ipcMain.on('token:createSession', async (e, username) => {
    const user = await GetUserRole(username)
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
    SetConfig('token', uuid).catch()
    e.returnValue = uuid
  }),

  expirySession: ipcMain.on('token:expiryToken', async (e) => {
    try {
      const token = await GetConfig('token')
      const tokenId = CommonUtils.decodeUUID(token)
      await ExpiryToken(tokenId)
      e.returnValue = true
    } catch (e) {
      e.returnValue = false
    }
  }),

  isUserLoggedIn: ipcMain.on('token:isUserLoggedIn', async (e) => {
    const token = await GetConfig('token')
    e.returnValue = token !== null && token !== undefined
  }),
}
