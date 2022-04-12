import { ipcMain } from 'electron'
import { Rapbs } from 'main/models/Rapbs'
import { RapbsPeriode } from 'main/models/RapbsPeriode'
import {
  AddRapbs,
  GetRapbs,
  GetRapbsBulan,
  GetRapbsLastUpdate,
} from 'main/repositories/Rapbs'
import {
  AddRapbsPeriode,
  GetRapbsPeriode,
  GetDetailListRapbs,
  GetRapbsSummary,
} from 'main/repositories/RapbsPeriode'
import CommonUtils from 'main/utils/CommonUtils'
import { IPC_KK } from 'global/ipc'
import {
  AddDetailKegiatan,
  DeleteRapbsByRapbsId,
  GetDetailKegiatan,
} from 'main/services/KertasKerjaService'
import { AnggaranKegiatan } from 'main/types/Anggaran'

module.exports = {
  /*
        param data :
        {
          idAnggaran: xxxx
          idPeriode: [81-92]
        }
      */
  getRapbsBulan: ipcMain.on(IPC_KK.getRapbsBulan, async (e, data) => {
    const res = await GetRapbsBulan(data.idAnggaran, data.idPeriode)
    e.returnValue = res.unwrapOr(<AnggaranKegiatan[]>[])
  }),

  getRapbs: ipcMain.on('kk:getRapbs', async (e, idRapbs) => {
    e.returnValue = await GetRapbs(idRapbs)
  }),

  getRapbsPeriode: ipcMain.on('kk:getRapbsPeriode', async (e, idRapbs) => {
    e.returnValue = await GetRapbsPeriode(idRapbs)
  }),

  addRapbs: ipcMain.on('kk:addRapbs', async (e, data) => {
    const idRapbs = CommonUtils.encodeUUID(CommonUtils.uuid())
    const dataRapbs = new Rapbs()
    dataRapbs.idRapbs = idRapbs
    dataRapbs.idAnggaran = data.idAnggaran
    dataRapbs.idRefKode = data.idRefKode
    dataRapbs.idRefTahunAnggaran = data.tahun
    dataRapbs.kodeRekening = data.kodeRekening
    dataRapbs.idBarang = data.idBarang == '' ? null : data.idBarang
    dataRapbs.urutan = data.urutan
    dataRapbs.uraian = data.uraian
    dataRapbs.uraianText = data.uraian
    dataRapbs.volume = data.volume
    dataRapbs.satuan = data.satuan
    dataRapbs.hargaSatuan = data.hargaSatuan
    dataRapbs.jumlah = data.jumlah
    dataRapbs.v1 = data.volume
    dataRapbs.s1 = data.satuan
    dataRapbs.keterangan = ''
    dataRapbs.softDelete = 0
    dataRapbs.createDate = new Date(data.create_date)
    dataRapbs.lastUpdate = new Date()
    dataRapbs.updaterId = data.pengguna_id
    try {
      await AddRapbs(dataRapbs)
      e.returnValue = idRapbs
    } catch {
      e.returnValue = null
    }
  }),

  updateRapbs: ipcMain.on('kk:updateRapbs', async (e, data) => {
    const dataRapbs = new Rapbs()
    dataRapbs.idRapbs = data.idRapbs
    dataRapbs.idAnggaran = data.idAnggaran
    dataRapbs.idRefKode = data.idRefKode
    dataRapbs.idRefTahunAnggaran = data.tahun
    dataRapbs.kodeRekening = data.kodeRekening
    dataRapbs.idBarang = data.idBarang == '' ? null : data.idBarang
    dataRapbs.urutan = data.urutan
    dataRapbs.uraian = data.uraian
    dataRapbs.uraianText = data.uraian
    dataRapbs.volume = data.volume
    dataRapbs.satuan = data.satuan
    dataRapbs.hargaSatuan = data.hargaSatuan
    dataRapbs.jumlah = data.jumlah
    dataRapbs.v1 = data.volume
    dataRapbs.s1 = data.satuan
    dataRapbs.keterangan = ''
    dataRapbs.softDelete = 0
    dataRapbs.lastUpdate = new Date()
    dataRapbs.updaterId = data.pengguna_id
    try {
      await AddRapbs(dataRapbs)
      e.returnValue = data.idRapbs
    } catch {
      e.returnValue = null
    }
  }),

  deleteRapbs: ipcMain.on(IPC_KK.deleteRapbs, async (e, idRapbs) => {
    e.returnValue = await DeleteRapbsByRapbsId(idRapbs)
  }),

  addAnggaranDetailKegiatan: ipcMain.on(
    IPC_KK.addAnggaranDetailKegiatan,
    async (e, detailKegiatan) => {
      e.returnValue = await AddDetailKegiatan(detailKegiatan)
    }
  ),

  addRapbsPeriode: ipcMain.on('kk:addRapbsPeriode', async (e, data) => {
    const idRapbsPeriode = CommonUtils.encodeUUID(CommonUtils.uuid())
    const dataRapbsPeriode = new RapbsPeriode()
    dataRapbsPeriode.idRapbsPeriode = idRapbsPeriode
    dataRapbsPeriode.idRapbs = data.idRapbs
    dataRapbsPeriode.idPeriode = data.idPeriode
    dataRapbsPeriode.volume = data.volume
    dataRapbsPeriode.satuan = data.satuan
    dataRapbsPeriode.hargaSatuan = data.hargaSatuan
    dataRapbsPeriode.jumlah = data.jumlah
    dataRapbsPeriode.v1 = data.volume
    dataRapbsPeriode.s1 = data.satuan
    dataRapbsPeriode.softDelete = 0
    dataRapbsPeriode.createDate = new Date()
    dataRapbsPeriode.lastUpdate = new Date()
    dataRapbsPeriode.updaterId = data.pengguna_id
    try {
      await AddRapbsPeriode(dataRapbsPeriode)
      e.returnValue = idRapbsPeriode
    } catch {
      e.returnValue = null
    }
  }),

  getRapbsSummary: ipcMain.on(IPC_KK.getRapbsSummary, async (e, data) => {
    const { tahap, idAnggaran } = data
    const result = await GetRapbsSummary(tahap, idAnggaran)
    e.returnValue = result
  }),

  getRapbsPeriodeDetail: ipcMain.on(
    IPC_KK.anggaranDetailKegiatan,
    async (e, id_tahap, id_kode, id_anggaran) => {
      e.returnValue = await GetDetailListRapbs(id_tahap, id_kode, id_anggaran)
    }
  ),

  getAnggaranDetailKegiatan: ipcMain.on(
    IPC_KK.getAnggaranDetailKegiatan,
    async (e, idRapbs) => {
      e.returnValue = await GetDetailKegiatan(idRapbs)
    }
  ),

  getRapbsLastUpdate: ipcMain.on(
    IPC_KK.getRapbsLastUpdate,
    async (e, idAnggaran) => {
      e.returnValue = await GetRapbsLastUpdate(idAnggaran)
    }
  ),

  updateRapbsPeriode: ipcMain.on('kk:updateRapbsPeriode', async (e, data) => {
    const dataRapbsPeriode = new RapbsPeriode()
    dataRapbsPeriode.idRapbsPeriode = data.idRapbsPeriode
    dataRapbsPeriode.idRapbs = data.idRapbs
    dataRapbsPeriode.volume = data.volume
    dataRapbsPeriode.satuan = data.satuan
    dataRapbsPeriode.hargaSatuan = data.hargaSatuan
    dataRapbsPeriode.jumlah = data.jumlah
    dataRapbsPeriode.v1 = data.volume
    dataRapbsPeriode.s1 = data.satuan
    dataRapbsPeriode.softDelete = 0
    dataRapbsPeriode.lastUpdate = new Date()
    dataRapbsPeriode.updaterId = data.pengguna_id
    try {
      await AddRapbsPeriode(dataRapbsPeriode)
      e.returnValue = data.idRapbsPeriode
    } catch {
      e.returnValue = null
    }
  }),
}
