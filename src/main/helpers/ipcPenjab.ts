import { ipcMain } from 'electron'
import { SekolahPenjab } from 'main/repositories/SekolahPenjab'
import {
  addSekolahPenjab,
  findSekolahPenjabId,
  updateSekolahPenjab,
} from 'main/services/SekolahPenjab'
import CommonUtils from 'main/utils/CommonUtils'

module.exports = {
  addPenjab: ipcMain.on('penjab:addPenjab', async (e, data) => {
    const getYear = new Date().getFullYear().toString()
    const dataPenjab = new SekolahPenjab()
    dataPenjab.sekolahId = data.sekolah_id
    dataPenjab.tanggalMulai = getYear + '-01-01'
    dataPenjab.tanggalSelesai = getYear + '12-31'
    dataPenjab.ks = data.kepsek
    dataPenjab.nipKs = data.nip_kepsek
    dataPenjab.emailKs = data.email_kepsek
    dataPenjab.telpKs = data.telepon_kepsek
    dataPenjab.bendahara = data.bendahara
    dataPenjab.nipBendahara = data.nip_bendahara
    dataPenjab.emailBendahara = data.email_bendahara
    dataPenjab.telpBendahara = data.telepon_bendahara
    dataPenjab.komite = data.komite
    dataPenjab.nipKomite = data.nip_komite
    dataPenjab.createDate = new Date(data.create_date)
    dataPenjab.lastUpdate = new Date()
    const idPenjab =
      (await findSekolahPenjabId(dataPenjab)) ??
      CommonUtils.encodeUUID(CommonUtils.uuid())
    await addSekolahPenjab(dataPenjab)
    e.returnValue = idPenjab
  }),

  setPenjab: ipcMain.on('penjab:updatePenjab', async (e, data) => {
    const dataPenjab = new SekolahPenjab()
    dataPenjab.ks = data.kepsek
    dataPenjab.nipKs = data.nip_kepsek
    dataPenjab.bendahara = data.bendahara
    dataPenjab.nipBendahara = data.nip_bendahara
    dataPenjab.komite = data.komite
    dataPenjab.nipKomite = data.nip_komite

    const idPenjab = await findSekolahPenjabId(dataPenjab)
    dataPenjab.idPenjab = idPenjab

    try {
      await updateSekolahPenjab(dataPenjab)
      e.returnValue = true
    } catch {
      e.returnValue = false
    }
  }),
}
