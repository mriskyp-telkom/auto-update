import { ipcMain } from 'electron'
import {
  CheckUser,
  CheckUserPass,
  CheckLogin,
  GetPenggunaByToken,
} from 'main/repositories/User'
import CommonUtils from 'main/utils/CommonUtils'
import { SetConfig, DeleteConfig, GetConfig } from 'main/repositories/Config'
import { Register } from 'main/services/RegistrationService'

module.exports = {
  checkUsername: ipcMain.on('user:checkUsername', async (e, username) => {
    e.returnValue = await CheckUser(username)
  }),

  checkUserPass: ipcMain.on(
    'user:checkUserPass',
    async (e, username, password) => {
      e.returnValue = await CheckUserPass(username, password)
    }
  ),

  checkLogin: ipcMain.on('user:checkLogin', async (e) => {
    e.returnValue = await CheckLogin()
  }),

  register: ipcMain.on('user:registration', async (e, data) => {
    try {
      await Register(data)
      e.returnValue = 1
    } catch (err) {
      e.returnValue = 0
    }
  }),

  getPengguna: ipcMain.on('user:getPenggunaId', async (e) => {
    try {
      let penggunaId = await GetConfig('pengguna_id')
      if (penggunaId === '') {
        const sessionId = await GetConfig('sessionId')
        const tokenId = CommonUtils.decodeUUID(sessionId)
        const pengguna = await GetPenggunaByToken(tokenId)
        penggunaId = pengguna.penggunaId
        await SetConfig('pengguna_id', penggunaId)
      }
      e.returnValue = penggunaId
    } catch (err) {
      e.returnValue = null
    }
  }),

  userLogout: ipcMain.on('user:logout', async (e) => {
    try {
      await DeleteConfig('sessionId')
      e.returnValue = true
    } catch (err) {
      e.returnValue = false
    }
  }),
}
