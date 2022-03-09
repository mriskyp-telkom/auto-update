import { ipcMain } from 'electron'
import { MstSekolah } from 'main/repositories/MstSekolah'
import { AddSekolah, GetSekolah } from 'main/services/Sekolah'

module.exports = {
  getSekolah: ipcMain.on('sekolah:getSekolah', async (e) => {
    e.returnValue = await GetSekolah()
  }),

  addSekolah: ipcMain.on('sekolah:addSekolah', async (e, data) => {
    const dataSekolah = new MstSekolah()
    dataSekolah.sekolahId = data.sekolah_id
    dataSekolah.nama = data.nama
    dataSekolah.alamat = data.alamat
    dataSekolah.bentukPendidikanId = data.bentuk_pendidikan_id
    dataSekolah.jumlahSiswa = data.jumlah_siswa
    dataSekolah.kodeRegistrasi = data.kode_registrasi
    dataSekolah.npsn = data.npsn
    dataSekolah.softDelete = 0
    dataSekolah.createDate = new Date(data.create_date)
    dataSekolah.lastUpdate = new Date()
    dataSekolah.updaterId = data.sekolah_id

    e.returnValue = await AddSekolah(dataSekolah)
  }),
}
