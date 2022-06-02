import { ipcMain } from 'electron'
import { IPC_TATA_USAHA } from 'global/ipc'
import { getConnection } from 'typeorm'
import { TataUsahaService } from 'main/services/TataUsahaService'
import {
  GetListAnggaranRequest,
  GetTotalSaldoRequest,
  GetTotalAnggaranRequest,
  CashWithdrawalRequest,
  GetListKasUmumRequest,
} from 'global/types/TataUsaha'
import { GetConfig } from 'main/repositories/ConfigRepository'

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
  getTotalSaldo: ipcMain.on(
    IPC_TATA_USAHA.getTotalSaldo,
    async (e, request: GetTotalSaldoRequest) => {
      e.returnValue = await tataUsahaService.GetTotalSaldo(request)
    }
  ),
  getTotalSudahDibelanjakan: ipcMain.on(
    IPC_TATA_USAHA.getTotalSudahDibelanjakan,
    async (e, request: GetTotalAnggaranRequest) => {
      e.returnValue = await tataUsahaService.GetTotalSudahDibelanjakan(request)
    }
  ),
  getTotalBisaDibelanjakan: ipcMain.on(
    IPC_TATA_USAHA.getTotalBisaDibelanjakan,
    async (e, request: GetTotalAnggaranRequest) => {
      e.returnValue = await tataUsahaService.GetTotalBisaDibelanjakan(request)
    }
  ),
  getTotalPerluDianggarkanUlang: ipcMain.on(
    IPC_TATA_USAHA.getTotalPerluDianggarkanUlang,
    async (e, request: GetTotalAnggaranRequest) => {
      e.returnValue = await tataUsahaService.GetTotalPerluDianggarkanUlang(
        request
      )
    }
  ),
  cashWithdrawal: ipcMain.on(
    IPC_TATA_USAHA.cashWithdrawal,
    async (e, request: CashWithdrawalRequest) => {
      e.returnValue = await tataUsahaService.CashWithdrawal(request)
    }
  ),
  GetListKasUmum: ipcMain.on(
    IPC_TATA_USAHA.getListKasUmum,
    async (e, request: GetListKasUmumRequest) => {
      e.returnValue = await tataUsahaService.GetListKasUmum(request)
    }
  ),
}
