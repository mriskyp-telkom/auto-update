import { ipcMain } from 'electron'
import { CheckUser, CheckUserPass } from '../services/User'

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
}