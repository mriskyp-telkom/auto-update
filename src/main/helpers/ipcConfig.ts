import { ipcMain } from 'electron'
import { SetConfig, GetConfig, SetBulkConfig } from 'main/repositories/Config'

module.exports = {
  getConfig: ipcMain.on('config:getConfig', async (e, varname) => {
    e.returnValue = await GetConfig(varname)
  }),

  setConfig: ipcMain.on('config:setConfig', async (e, varname, varvalue) => {
    e.returnValue = await SetConfig(varname, varvalue)
  }),

  setBulkConfig: ipcMain.on('config:setBulkConfig', async (e, data) => {
    e.returnValue = await SetBulkConfig(data)
  }),
}
