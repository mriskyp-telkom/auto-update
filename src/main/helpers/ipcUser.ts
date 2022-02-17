import { ipcMain } from 'electron'
import { CheckUser, CheckUserPass, CheckLogin } from '../services/User'

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
}
