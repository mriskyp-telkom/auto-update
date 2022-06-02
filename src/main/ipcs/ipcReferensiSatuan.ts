import {
  addBulkRefSatuan,
  getRefSatuan,
  getRefSatuanLastUpdate,
} from '../repositories/RefSatuanRepository'
import { ipcMain } from 'electron'
import CommonUtils from 'main/utils/CommonUtils'
import { IPC_REFERENSI } from 'global/ipc'

module.exports = {
  getRefSatuanLastUpdate: ipcMain.on(
    IPC_REFERENSI.getRefSatuanLastUpdate,
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

  addBulkRefSatuan: ipcMain.on(
    IPC_REFERENSI.addBulkRefSatuan,
    async (e, data) => {
      let dataReferensi: any = []
      const satuan: string[] = []
      for (let i = 0; i < data.length; i++) {
        const sat = data[i]
        if (!satuan.includes(sat.satuan)) {
          dataReferensi.push({
            refSatuanId: CommonUtils.encodeUUID(sat.ref_satuan_id),
            satuan: sat.satuan,
            unit: sat.unit,
            createDate: sat.create_date,
            expiredDate: sat.expired_date,
            lastUpdate: sat.last_update,
          })
          if ((i !== 0 && i % 200 == 0) || data.length == i + 1) {
            await addBulkRefSatuan(dataReferensi)
            dataReferensi = []
          }
          satuan.push(sat.satuan)
        }
      }

      e.returnValue = true
    }
  ),
}
