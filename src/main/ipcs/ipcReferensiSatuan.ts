import {
  getRefSatuan,
  getRefSatuanLastUpdate,
} from '../repositories/RefSatuanRepository'
import { ipcMain } from 'electron'
import CommonUtils from 'main/utils/CommonUtils'
import { IPC_REFERENSI } from 'global/ipc'

module.exports = {
  getRefSatuanLastUpdate: ipcMain.on(
    'satuan:getRefSatuanLastUpdate',
    async (e) => {
      const result = await getRefSatuanLastUpdate()

      e.returnValue =
        result != null
          ? CommonUtils.formatDateToString(result, 'YYYYMMDDHHmmss')
          : '19010101000000'
    }
  ),
  getRefSatuan: ipcMain.on(IPC_REFERENSI.getRefSatuan, async (e) => {
    e.returnValue = await getRefSatuan()
  }),
}
