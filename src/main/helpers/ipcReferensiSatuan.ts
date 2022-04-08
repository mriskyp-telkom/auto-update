import {
  getRefSatuan,
  getRefSatuanLastUpdate,
} from './../repositories/RefSatuan'
import { ipcMain } from 'electron'
import CommonUtils from 'main/utils/CommonUtils'
import { IPC_REFERENSI } from 'global/ipc'

module.exports = {
  getRefSatuanLastUpdate: ipcMain.on(
    'satuan:getRefSatuanLastUpdate',
    async (e) => {
      const result = await getRefSatuanLastUpdate()
      // console.log('result')
      // console.log(result)

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
    'referensi:addBulkRefSatuan',
    async (e, data) => {
      let dataSatuan: any = []
      for (let i = 0; i < data.length; i++) {
        const br = data[i]
        dataSatuan.push({
          ref_satuan_id: br.ref_satuan_id,
          satuan: br.satuan,
          unit: br.unit,
          softDelete: br.soft_delete,
          createDate: br.create_date,
          lastUpdate: br.last_update,
          expiredDate: br.expired_date,
        })
        if ((i !== 0 && i % 200 == 0) || data.length == i + 1) {
          await addBulkRefSatuan(dataSatuan)
          dataSatuan = []
        }
      }
      e.returnValue = true
    }
  ),
}
