import { ipcMain } from 'electron'
import { IPC_TATA_USAHA } from 'global/ipc'
import { getConnection } from 'typeorm'
import { TataUsahaService } from 'main/services/TataUsaha'
import { GetListAnggaranRequest } from 'global/types/TataUsahaTypes'
import { GetConfig } from 'main/repositories/Config'

const conn = getConnection()
const tataUsahaService = new TataUsahaService(conn)

module.exports = {
  getListAnggaran: ipcMain.on(
    IPC_TATA_USAHA.getListAnggaran,
    async (e, idSumberDana: number) => {
      const request = <GetListAnggaranRequest>{
        idSumberDana: idSumberDana,
        tahunAnggaran: [],
      }

      let tahunAktif = new Date().getFullYear()
      const tahunAktifConfig = await GetConfig('tahun_aktif')
      if (tahunAktifConfig !== '') {
        tahunAktif = parseInt(tahunAktifConfig)
      }

      const numberOfYear = 3
      request.tahunAnggaran = [...Array(numberOfYear)].map(
        (_, i) => tahunAktif - numberOfYear + (i + 1)
      )

      e.returnValue = await tataUsahaService.GetListAnggaran(request)
    }
  ),
}
