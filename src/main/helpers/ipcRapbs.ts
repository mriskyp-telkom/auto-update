import { ipcMain } from 'electron'

import { GetListRapbsPeriodeByListRapbsId } from 'main/repositories/RapbsPeriode'

import { GetRapbsByAnggaranId } from 'main/repositories/Rapbs'

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
