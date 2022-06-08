import { ipcMain } from 'electron'
import { IPC_BUKTI_BELANJA } from 'global/ipc'
import { getConnection } from 'typeorm'
import { BuktiBelanjaService } from 'main/services/BuktiBelanjaService'

const conn = getConnection()
const buktiBelanjaService = new BuktiBelanjaService(conn)

module.exports = {
  getInformasiToko: ipcMain.on(
    IPC_BUKTI_BELANJA.getInformasiToko,
    async (e, namaToko: string) => {
      e.returnValue = await buktiBelanjaService.GetInformasiToko(namaToko)
    }
  ),
}
