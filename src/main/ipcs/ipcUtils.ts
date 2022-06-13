import { ipcMain } from 'electron'
import { GetPrintPDFPathRequest } from 'global/types/Anggaran'
import { printToPdf } from 'main/services/PrintService'
import CommonUtils from 'main/utils/CommonUtils'
import path from 'path'

module.exports = {
  decodeUUID: ipcMain.on('utils:decodeUUID', async (e, v) => {
    e.returnValue = CommonUtils.decodeUUID(v)
  }),
  encodeUUID: ipcMain.on('utils:encodeUUID', async (e, v) => {
    e.returnValue = CommonUtils.encodeUUID(v)
  }),
  getPrintPDFPathAsync: ipcMain.handle(
    'utils:getPrintPDFPathAsync',
    async (e, request: GetPrintPDFPathRequest) => {
      request.appDir = path.join(__dirname, '../../print/app')
      const result = await printToPdf(request)
      return result
    }
  ),
}
