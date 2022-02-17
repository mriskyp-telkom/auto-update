import { ipcMain } from 'electron'
import { CreateToken } from '../services/Token'
import { GetUserRole } from '../services/User'
import { SetConfig } from '../services/Config'
import { Token } from '../repositories/Token'
import CommonUtils from '../utils/CommonUtils'

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
}
