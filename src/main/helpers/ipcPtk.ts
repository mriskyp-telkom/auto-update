import { ipcMain } from 'electron'
import { AddBulkPtk, GetLastUpdate } from 'main/services/Ptk'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  getPtkLastUpdate: ipcMain.on('ptk:getPtkLastUpdate', async (e) => {
    const result = await GetLastUpdate()
    e.returnValue =
      result != null
        ? CommonUtils.formatDateToString(result, 'YYYYMMDDHHmmss')
        : '19010101000000'
  }),

  addBulkRefKode: ipcMain.on('ptk:addBulkPtk', async (e, data) => {
    let dataPtk: any = []
    for (let i = 0; i < data.length; i++) {
      const ptk = data[i]
      dataPtk.push({
        sekolahId: ptk.sekolah_id,
        ptkId: ptk.ptk_id,
        tahunAjaranId: ptk.tahun_ajaran_id,
        nama: ptk.nama,
        jenisKelamin: ptk.jenis_kelamin,
        masaKerjaTahun: ptk.masa_kerja_tahun,
        masaKerjaBulan: ptk.masa_kerja_bulan,
        nuptk: ptk.nuptk,
        jenisPtkArkas: ptk.jenis_ptk_arkas,
        pernahSerfikasi: ptk.pernah_sertifikasi,
        isCutOff: ptk.is_cut_off,
        createDate: ptk.create_date,
        lastUpdate: ptk.last_update,
        softDelete: ptk.soft_delete,
      })
      if ((i !== 0 && i % 200 == 0) || data.length == i + 1) {
        await AddBulkPtk(dataPtk)
        dataPtk = []
      }
    }
    e.returnValue = true
  }),
}
