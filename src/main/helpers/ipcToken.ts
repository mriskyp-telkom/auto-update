import { ipcMain } from 'electron'
import { CreateToken } from '../services/Token'
import { GetUserRole } from '../services/User'
import { SetConfig } from '../services/Config'
import { IToken } from '../types/IToken'
import CommonUtils from '../utils/CommonUtils'

module.exports = {
  createSession: ipcMain.on('token:createSession', async (e, username) => {
    const user = await GetUserRole(username)
    const uuid = CommonUtils.uuid()
    if (user) {
      const token: IToken = {
        tokenId: CommonUtils.encodeUUID(uuid),
        userroleId: user.userroleId,
        appId: 'CNhMM6obP06_yBqZAw2PZg',
        ipaddr: '',
        browser: '',
        createDate: new Date(),
        lastUpdate: new Date(),
        expiredDate: null,
      }
      await CreateToken(token)
      SetConfig('token', uuid).catch()
    }
    e.returnValue = uuid
  }),
}
