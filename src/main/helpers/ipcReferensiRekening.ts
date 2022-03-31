import { ipcMain } from 'electron'
import {
  addBulkRefRekening,
  getLastUpdate,
  getRefRekeningList,
} from 'main/repositories/RefRekening'
import CommonUtils from 'main/utils/CommonUtils'
import { IPC_REFERENSI } from 'global/ipc'

module.exports = {
  getRefRekeningLastUpdate: ipcMain.on(
    'referensi:getRefRekeningLastUpdate',
    async (e) => {
      const result = await getLastUpdate()
      e.returnValue =
        result != null
          ? CommonUtils.formatDateToString(result, 'YYYYMMDDHHmmss')
          : '19010101000000'
    }
  ),

  addBulkRefRekening: ipcMain.on(
    'referensi:addBulkRefRekening',
    async (e, data) => {
      let dataRekening: any = []
      for (let i = 0; i < data.length; i++) {
        const rek = data[i]
        dataRekening.push({
          kodeRekening: rek.kode_rekening,
          rekening: rek.rekening,
          neraca: rek.neraca,
          blokid: rek.blokid,
          batasAtas: rek.batas_atas,
          batasBawah: rek.batas_bawah,
          validasiType: rek.validasi_type,
          isPpn: rek.is_ppn,
          isPph21: rek.is_pph21,
          isPph22: rek.is_pph22,
          isPph23: rek.is_pph23,
          isPph4: rek.is_pph4,
          isSspd: rek.is_sspd,
          bhp: rek.bhp,
          isCustomPajak_1: rek.is_custom_pajak_1,
          isHonor: rek.isHonor,
          isBuku: rek.is_buku,
          isCustomSatuan: rek.is_custom_satuan,
          createDate: rek.create_date,
          lastUpdate: rek.last_update,
          expiredDate: rek.expiredDAte,
        })
        if ((i !== 0 && i % 200 == 0) || data.length == i + 1) {
          await addBulkRefRekening(dataRekening)
          dataRekening = []
        }
      }

      e.returnValue = true
    }
  ),

  getRefRekening: ipcMain.on(IPC_REFERENSI.getRefRekening, async (e) => {
    e.returnValue = await getRefRekeningList()
  }),
}
