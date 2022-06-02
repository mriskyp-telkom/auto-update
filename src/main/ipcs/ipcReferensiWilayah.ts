import { ipcMain } from 'electron'
import { AddWilayah } from 'main/repositories/WilayahRepository'
import { MstWilayah } from 'main/models/MstWilayah'

module.exports = {
  addWilayah: ipcMain.on('referensi:addWilayah', async (e, data) => {
    const wilayah = new MstWilayah()
    wilayah.kodeWilayah = data.kode_wilayah
    wilayah.mstKodeWilayah = data.mst_kode_wilayah
    wilayah.negaraId = 'ID'
    wilayah.idLevelWilayah = data.id_level_wilayah
    wilayah.nama = data.nama
    wilayah.asalWilayah = data.asal_wilayah
    wilayah.kodeBps = data.kode_bps
    wilayah.kodeDagri = data.kode_dagri
    wilayah.kodeKeu = data.kode_keu
    wilayah.createDate = data.create_date
    wilayah.lastUpdate = data.last_update
    wilayah.expiredDate = data.expired_date

    e.returnValue = await AddWilayah(wilayah)
  }),
}
