import { ipcMain } from 'electron'
import { MstSekolah } from 'main/repositories/MstSekolah'
import { AddSekolah, GetSekolah } from 'main/services/Sekolah'
import { GetConfig } from 'main/services/Config'

module.exports = {
  getSekolah: ipcMain.on('sekolah:getSekolah', async (e) => {
    e.returnValue = await GetSekolah()
  }),

  addSekolah: ipcMain.on('sekolah:addSekolah', async (e, data) => {
    const penggunaId = await GetConfig('pengguna_id')
    const sekolah = await GetSekolah()
    const dataSekolah = new MstSekolah()
    dataSekolah.sekolahId = data.sekolah_id
    dataSekolah.kodeWilayah = data.kode_wilayah
    dataSekolah.nama = data.nama
    dataSekolah.alamat = data.alamat
    dataSekolah.statusSekolah = data.status_sekolah
    dataSekolah.bentukPendidikanId = data.bentuk_pendidikan_id
    dataSekolah.kepsek = data.kepsek
    dataSekolah.teleponKepsek = data.telepon_kepsek
    dataSekolah.nipKepsek = data.nip_kepala_sekolah
    dataSekolah.emailKepsek = data.email_kepsek
    dataSekolah.jumlahSiswa = data.jumlah_siswa
    dataSekolah.kodeRegistrasi = data.kode_registrasi
    dataSekolah.npsn = data.npsn
    dataSekolah.softDelete = 0
    dataSekolah.createDate = sekolah != null ? sekolah.createDate : new Date()
    dataSekolah.lastUpdate = new Date()
    dataSekolah.updaterId = penggunaId

    e.returnValue = await AddSekolah(dataSekolah)
  }),
}
