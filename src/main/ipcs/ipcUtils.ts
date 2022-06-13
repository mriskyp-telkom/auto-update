import { ipcMain } from 'electron'
import { GetPrintPDFPathRequest } from 'global/types/Anggaran'
import { printToPdf } from 'main/services/PrintService'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  decodeUUID: ipcMain.on('utils:decodeUUID', async (e, v) => {
    e.returnValue = CommonUtils.decodeUUID(v)
  }),
  encodeUUID: ipcMain.on('utils:encodeUUID', async (e, v) => {
    e.returnValue = CommonUtils.encodeUUID(v)
  }),
  getPrintPDFPath: ipcMain.on(
    'utils:getPrintPDFPath',
    async (e, request: GetPrintPDFPathRequest) => {
      e.returnValue = printToPdf(request)
    }
  ),
}
