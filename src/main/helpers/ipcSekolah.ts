import { ipcMain } from 'electron'
import { GetSekolah } from 'main/services/Sekolah'

module.exports = {
  getSekolah: ipcMain.on('sekolah:getSekolah', async (e) => {
    e.returnValue = await GetSekolah()
  }),
}
