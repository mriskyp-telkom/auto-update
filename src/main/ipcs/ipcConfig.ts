import { ipcMain } from 'electron'
import { SetConfigRequest } from 'global/types/Config'
import {
  SetConfig,
  GetConfig,
  SetBulkConfig,
} from 'main/repositories/ConfigRepository'

module.exports = {
  getConfig: ipcMain.on('config:getConfig', async (e, varname) => {
    e.returnValue = await GetConfig(varname)
  }),

  setConfig: ipcMain.on(
    'config:setConfig',
    async (e, data: SetConfigRequest) => {
      e.returnValue = await SetConfig(data.varname, data.varvalue)
    }
  ),

  setBulkConfig: ipcMain.on('config:setBulkConfig', async (e, data) => {
    e.returnValue = await SetBulkConfig(data)
  }),
}
