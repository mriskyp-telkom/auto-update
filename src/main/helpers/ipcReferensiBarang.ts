import { ipcMain } from 'electron'
import {
  getLastUpdate,
  addBulkRefAcuanBarang,
  getRefBarangRekening,
} from 'main/services/RefAcuanBarang'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  getRefBarangLastUpdate: ipcMain.on(
    'referensi:getRefBarangLastUpdate',
    async (e) => {
      const result = await getLastUpdate()
      e.returnValue =
        result != null
          ? CommonUtils.formatDateToString(result, 'YYYYMMDDHHmmss')
          : '19010101000000'
    }
  ),

  addBulkRefBarang: ipcMain.on(
    'referensi:addBulkRefBarang',
    async (e, data) => {
      let dataBarang: any = []
      for (let i = 0; i < data.length; i++) {
        const br = data[i]
        dataBarang.push({
          idBarang: br.id_barang,
          kodeRekening: br.kode_rekening,
          namaBarang: br.nama_barang,
          satuan: br.satuan,
          blokId: br.blok_id,
          kodeBelanja: br.kode_belanja,
          hargaBArang: br.harga_barang,
          batasBawah: br.batas_bawah,
          batasAtas: br.batas_atas,
          createDate: br.create_date,
          lastUpdate: br.last_update,
          expiredDate: br.expired_date,
          kategoriId: br.kategori_id,
          hsCode: br.hs_code,
          kbki: br.kbki,
        })
        if ((i !== 0 && i % 200 == 0) || data.length == i + 1) {
          await addBulkRefAcuanBarang(dataBarang)
          dataBarang = []
        }
      }
      e.returnValue = true
    }
  ),

  getRefBarangByRekening: ipcMain.on(
    'referensi:getRefBarangByRekening',
    async (e, kodeRekening) => {
      e.returnValue = await getRefBarangRekening(kodeRekening)
    }
  ),
}
