import { ipcMain } from 'electron'
import { Anggaran } from 'main/repositories/Anggaran'
import {
  AddAnggaran,
  DelAnggaran,
  GetAnggaran,
  GetPagu,
} from 'main/services/Anggaran'
import { GetConfig } from 'main/services/Config'
import CommonUtils from '../utils/CommonUtils'

module.exports = {
  getAnggaran: ipcMain.on('anggaran:getAnggaran', async (e) => {
    const configTahunAktif = await GetConfig('tahun_aktif')
    const tahunAktif = parseInt(configTahunAktif)
    const listTahun = Array.from({ length: 3 }, (_, i) => tahunAktif - i)
    const dataAnggaran = await GetAnggaran(1, listTahun)
    const listAnggaran = []

    for (let tahun = tahunAktif; tahun > tahunAktif - 3; tahun--) {
      const data = dataAnggaran.find((a: any) => a.tahun === tahun)
      const anggaran = {
        id_anggaran: '',
        tahun: `${tahun}`,
        status: '',
        tenggat_waktu: `${tahun}-12-30`,
        status_updated_at: '',
        type: '',
        tanggal_pengesahan: '',
      }
      if (data != null) {
        anggaran.id_anggaran = data.id_anggaran
        anggaran.tanggal_pengesahan =
          data.tanggal_pengesahan != null
            ? CommonUtils.formatDateToString(
                data.tanggal_pengesahan,
                'YYYY-MM-DD HH:mm'
              )
            : ''
        anggaran.status_updated_at =
          data.last_update != null
            ? CommonUtils.formatDateToString(
                data.last_update,
                'YYYY-MM-DD HH:mm'
              )
            : ''
        if (
          data.tanggal_pengajuan == null &&
          data.tanggal_pengesahan == null &&
          (data.alasan_penolakan == null || data.alasan_penolakan == '')
        ) {
          anggaran.status = 'draft'
        } else if (
          data.tanggal_pengajuan != null &&
          data.tanggal_pengesahan == null &&
          (data.alasan_penolakan == null || data.alasan_penolakan == '')
        ) {
          anggaran.status = 'waiting'
        } else if (
          data.tanggal_pengesahan != null &&
          (data.alasan_penolakan == null || data.alasan_penolakan == '')
        ) {
          const countPerubahan = Math.floor(data.is_revisi / 100)
          const pergeseran = data.is_revisi % 100
          anggaran.status = 'approved'
          if (countPerubahan >= 1) {
            anggaran.type = 'Perubahan'
          }
          if (pergeseran > 0) {
            anggaran.type = 'Pergeseran'
          }
        } else if (
          data.alasan_penolakan != null &&
          data.alasan_penolakan !== ''
        ) {
          data.status = 'not_approved'
        }
      } else {
        anggaran.status = 'not_created'
        if (tahun < tahunAktif) {
          anggaran.status = 'disabled'
        }
      }
      listAnggaran.push(anggaran)
    }
    e.returnValue = listAnggaran
  }),

  addAnggaran: ipcMain.on('anggaran:addAnggaran', async (e, data) => {
    /*
      data:
        id_ref_sumber_dana
        volume: default = 1
        harga_satuan:
        pengguna_id:
        id_penjab:
        tahun:
    */
    const idAnggaran = CommonUtils.encodeUUID(CommonUtils.uuid())
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

  delAnggaran: ipcMain.on('anggaran:deleteAnggaran', async (e, idAnggaran) => {
    e.returnValue = await DelAnggaran(idAnggaran)
  }),

  getPagu: ipcMain.on('anggaran:getPagu', async (e, idAnggaran) => {
    /*
      return :
      {
        pagu: number,
        total: number,
        sisa: number
      }
    */
    e.returnValue = await GetPagu(idAnggaran)
  }),
}
