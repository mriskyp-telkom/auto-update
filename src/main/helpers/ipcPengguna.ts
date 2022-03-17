import { ipcMain } from 'electron'
import { GetPengguna } from 'main/services/Pengguna'

module.exports = {
  getPengguna: ipcMain.on('pengguna:getPengguna', async (e) => {
    e.returnValue = await GetPengguna()
  }),
}
