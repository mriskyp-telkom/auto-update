import { ipcMain } from 'electron'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  decodeUUID: ipcMain.on('utils:decodeUUID', async (e, v) => {
    e.returnValue = CommonUtils.decodeUUID(v)
  }),
  encodeUUID: ipcMain.on('utils:encodeUUID', async (e, v) => {
    e.returnValue = CommonUtils.encodeUUID(v)
  }),
}
