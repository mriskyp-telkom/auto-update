import { ipcMain } from 'electron'
import { Anggaran } from 'main/models/Anggaran'
import { Anggaran as AnggaranData } from 'global/types/Anggaran'
import {
  AddAnggaran,
  DelAnggaran,
  GetAnggaranBefore,
  GetPagu,
  CopyAnggaran,
  GetTotalAnggaran,
  UpdateIsPengesahan,
  UpdateTanggalPengajuan,
  ResetAnggaranAfterPengajuan,
} from 'main/repositories/AnggaranRepository'
import { GetConfig } from 'main/repositories/ConfigRepository'
import CommonUtils from 'main/utils/CommonUtils'
import {
  GetAnggaranList,
  GetDetailAnggaran,
  IPCUpsertAnggaran,
} from 'main/services/AnggaranService'

import { IPC_ANGGARAN } from 'global/ipc'

module.exports = {
  getAnggaran: ipcMain.on('anggaran:getAnggaran', async (e, idSumberDana) => {
    e.returnValue = await GetAnggaranList(idSumberDana)
  }),

  getAnggaranById: ipcMain.on(
    IPC_ANGGARAN.getAnggaranById,
    async (e: any, idAnggaran: string) => {
      e.returnValue = await GetDetailAnggaran(idAnggaran)
    }
  ),

  addAnggaran: ipcMain.on(IPC_ANGGARAN.addAnggaran, async (e, data) => {
    /*
      data:
        id_ref_sumber_dana
        volume: default = 1
        harga_satuan:
        pengguna_id:
        id_penjab:
        tahun:
    */
    const idAnggaran = CommonUtils.encodeUUIDFromV4()
    const dataAnggaran = new Anggaran()
    dataAnggaran.idAnggaran = idAnggaran
    dataAnggaran.idRefSumberDana = data.id_ref_sumber_dana
    dataAnggaran.sekolahId = await GetConfig('sekolah_id')
    dataAnggaran.tahunAnggaran = data.tahun
    dataAnggaran.volume = data.volume
    dataAnggaran.hargaSatuan = data.harga_satuan
    dataAnggaran.jumlah = data.volume * data.harga_satuan
    dataAnggaran.sisaAnggaran = 0
    dataAnggaran.isApprove = 0
    dataAnggaran.isRevisi = 0
    dataAnggaran.isAktif = 1
    dataAnggaran.softDelete = 0
    dataAnggaran.createDate = new Date(data.create_date)
    dataAnggaran.lastUpdate = new Date()
    dataAnggaran.updaterId = data.pengguna_id
    dataAnggaran.idPenjab = data.id_penjab
    await AddAnggaran(dataAnggaran)
    e.returnValue = idAnggaran
  }),

  upsertAnggaran: ipcMain.on(IPC_ANGGARAN.upsertAnggaran, async (e, data) => {
    const d = <AnggaranData>data
    e.returnValue = await IPCUpsertAnggaran(d)
  }),

  updateIsPengesahan: ipcMain.on(
    IPC_ANGGARAN.updateIsPengesahan,
    async (e, idAnggaran, isPengesahan) => {
      e.returnValue = await UpdateIsPengesahan(idAnggaran, isPengesahan)
    }
  ),

  UpdateTanggalPengajuan: ipcMain.on(
    IPC_ANGGARAN.UpdateTanggalPengajuan,
    async (e, idAnggaran, anggaranTanggalPengajuan) => {
      e.returnValue = await UpdateTanggalPengajuan(
        idAnggaran,
        anggaranTanggalPengajuan
      )
    }
  ),

  checkBefore: ipcMain.on('anggaran:checkBefore', async (e, data) => {
    /*
      ==== PARAM ====
      data :
      {
        data.sumber_dana: number (1,3,5,11,12,33,34,35)
        data.tahun: number
      }
      ==== RETRUN ====
      return : string (idAnggaran year befeore)
    */
    e.returnValue = await GetAnggaranBefore(data.sumber_dana, data.tahun)
  }),

  delAnggaran: ipcMain.on('anggaran:deleteAnggaran', async (e, idAnggaran) => {
    e.returnValue = await DelAnggaran(idAnggaran)
  }),

  getPagu: ipcMain.on(IPC_ANGGARAN.getPagu, async (e, idAnggaran) => {
    /*
      return :
      {
        tahun_anggaran: number,
        pagu: number,
        total: number,
        sisa: number
      }
    */
    e.returnValue = await GetPagu(idAnggaran)
  }),

  copyAnggaran: ipcMain.on('anggaran:copyAnggaran', async (e, data) => {
    /*
      data:
        id_ref_sumber_dana
        volume: default = 1
        harga_satuan:
        pengguna_id:
        id_penjab:
        tahun:
        id_anggaran_before:
    */
    if (data.id_anggaran_before !== '') {
      const {
        id_anggaran_before,
        id_ref_sumber_dana,
        tahun,
        volume,
        harga_satuan,
        pengguna_id,
        id_penjab,
      } = data
      const sekolah_id = await GetConfig('sekolah_id')

      e.returnValue = await CopyAnggaran(
        id_anggaran_before,
        id_ref_sumber_dana,
        sekolah_id,
        tahun,
        volume,
        harga_satuan,
        pengguna_id,
        id_penjab
      )
    } else {
      e.returnValue = ''
    }
  }),

  getTotalAnggaran: ipcMain.on(
    IPC_ANGGARAN.getTotalAnggaran,
    async (e, data) => {
      const id_tahap = data.id_tahap
      const id_anggaran = data.id_anggaran
      e.returnValue = await GetTotalAnggaran(id_tahap, id_anggaran)
    }
  ),

  resetAnggaranAfterPengajuan: ipcMain.on(
    IPC_ANGGARAN.resetAnggaranAfterPengajuan,
    async (e, idAnggaran: string) => {
      e.returnValue = await ResetAnggaranAfterPengajuan(idAnggaran)
    }
  ),
}
