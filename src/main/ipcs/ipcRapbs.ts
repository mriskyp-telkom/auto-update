import { ipcMain } from 'electron'

import { GetListRapbsPeriodeByListRapbsId } from 'main/repositories/RapbsPeriodeRepository'

import { GetRapbsByAnggaranId } from 'main/repositories/RapbsRepository'

module.exports = {
  GetListRapbsPeriodeByListRapbsId: ipcMain.on(
    'rapbs:GetListRapbsPeriodeByListRapbsId',
    async (e, idRapbs) => {
      e.returnValue = await GetListRapbsPeriodeByListRapbsId(idRapbs)
    }
  ),

  GetRapbsByAnggaranId: ipcMain.on(
    'rapbs:GetRapbsByAnggaranId',
    async (e, idAnggaran) => {
      e.returnValue = await GetRapbsByAnggaranId(idAnggaran)
    }
  ),
}
