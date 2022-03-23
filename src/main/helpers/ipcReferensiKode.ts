import { ipcMain } from 'electron'
import {
  addBulkRefKode,
  getLastUpdate,
  getRefKodeList,
} from 'main/services/RefKode'
import { getBentukPendidikan } from 'main/services/Sekolah'
import CommonUtils from 'main/utils/CommonUtils'
import { IPC_REFERENSI } from 'global/ipc'

module.exports = {
  getRefKodeLastUpdate: ipcMain.on(
    'referensi:getRefKodeLastUpdate',
    async (e) => {
      const result = await getLastUpdate()
      e.returnValue =
        result != null
          ? CommonUtils.formatDateToString(result, 'YYYYMMDDHHmmss')
          : '19010101000000'
    }
  ),

  addBulkRefKode: ipcMain.on('referensi:addBulkRefKode', async (e, data) => {
    let dataKode: any = []

    for (let i = 0; i < data.length; i++) {
      const kode = data[i]
      dataKode.push({
        idRefKode: kode.id_ref_kode,
        idKode: kode.id_kode,
        parentKode: kode.parent_kode,
        uraianKode: kode.uraian_kode,
        isBosPusat: kode.is_bos_pusat,
        isBosProp: kode.is_bos_prop,
        isBosKab: kode.is_bos_kab,
        isKomite: kode.is_komite,
        isLainnnya: kode.is_lainnnya,
        idLevelKode: kode.id_level_kode,
        bentukPendidikanId: kode.bentuk_pendidikan_id,
        createDate: kode.create_date,
        lastUpdate: kode.last_update,
        expiredDate: kode.expired_date,
      })
      if ((i !== 0 && i % 200 == 0) || data.length == i + 1) {
        await addBulkRefKode(dataKode)
        dataKode = []
      }
    }
    e.returnValue = true
  }),

  getRefKode: ipcMain.on(IPC_REFERENSI.getRefKode, async (e) => {
    const getBentuk = await getBentukPendidikan()
    e.returnValue = await getRefKodeList(getBentuk)
  }),
}
