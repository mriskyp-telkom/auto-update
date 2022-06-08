export const ANGGARAN = 'anggaran'
export const PENJAB = 'penjab'
export const PTK = 'ptk'
export const REFERENSI = 'referensi'
export const KK = 'kk'
export const CONFIG = 'config'
export const SEKOLAH = 'sekolah'
export const RAPBS = 'rapbs'
export const TATA_USAHA = 'tata_usaha'
export const BUKTI_BELANJA = 'bukti_belanja'

export const IPC_ANGGARAN = {
  getAnggaranById: `${ANGGARAN}:getAnggaranById`,
  getPagu: `${ANGGARAN}:getPagu`,
  getTotalAnggaran: `${ANGGARAN}:getTotalAnggaran`,
  addAnggaran: `${ANGGARAN}:addAnggaran`,
  upsertAnggaran: `${ANGGARAN}:upsertAnggaran`,
  updateIsPengesahan: `${ANGGARAN}:updateIsPengesahan`,
  UpdateTanggalPengajuan: `${ANGGARAN}:UpdateTanggalPengajuan`,
  resetAnggaranAfterPengajuan: `${ANGGARAN}:ResetAnggaranAfterPengajuan`,
}

export const IPC_PENJAB = {
  getPenjabById: `${PENJAB}:getPenjabById`,
}

export const IPC_PTK = {
  getPtk: `${PTK}:getPtk`,
  GetRapbsPtkHonor: `${PTK}:GetRapbsPtkHonor`,
}

export const IPC_REFERENSI = {
  getRefBarangByRekening: `${REFERENSI}:getRefBarangByRekening`,
  getRefKode: `${REFERENSI}:getRefKode`,
  getRefRekening: `${REFERENSI}:getRefRekening`,

  addBulkRefSatuan: `${REFERENSI}:addBulkRefSatuan`,
  getRefSatuan: `${REFERENSI}:getRefSatuan`,
  getRefSatuanLastUpdate: `${REFERENSI}:getRefSatuanLastUpdate`,
}

export const IPC_KK = {
  anggaranDetailKegiatan: `${KK}:anggaranDetailKegiatan`,
  addAnggaranDetailKegiatan: `${KK}:addAnggaranDetailKegiatan`,
  getAnggaranDetailKegiatan: `${KK}:getAnggaranDetailKegiatan`,
  updateAnggaranDetailKegiatan: `${KK}:updateAnggaranDetailKegiatan`,

  getRapbsBulan: `${KK}:getRapbsBulan`,
  getRapbsLastUpdate: `${KK}:getRapbsLastUpdate`,
  getRapbsSummary: `${KK}:getRapbsSummary`,
  deleteRapbs: `${KK}:deleteRapbs`,
  getListValidasiReferensiPeriode: `${KK}:getListValidasiReferensiPeriode`,

  aktivasiBku: `${KK}:aktivasiBku`,
}

export const IPC_CONFIG = {
  getConfig: `${CONFIG}:getConfig`,
  setConfig: `${CONFIG}:setConfig`,
}

export const IPC_SEKOLAH = {
  getSekolah: `${SEKOLAH}:getSekolah`,
}

export const IPC_RAPBS = {
  GetListRapbsPeriodeByListRapbsId: `${RAPBS}:GetListRapbsPeriodeByListRapbsId`,
  GetRapbsByAnggaranId: `${RAPBS}:GetRapbsByAnggaranId`,
}

export const IPC_TATA_USAHA = {
  getListAnggaran: `${TATA_USAHA}:getListAnggaran`,
  getTotalSaldo: `${TATA_USAHA}:getTotalSaldo`,
  getTotalSudahDibelanjakan: `${TATA_USAHA}:getTotalSudahDibelanjakan`,
  getTotalBisaDibelanjakan: `${TATA_USAHA}:getTotalBisaDibelanjakan`,
  getTotalPerluDianggarkanUlang: `${TATA_USAHA}:getTotalPerluDianggarkanUlang`,
  cashWithdrawal: `${TATA_USAHA}:cashWithdrawal`,
  getListKasUmum: `${TATA_USAHA}:getListKasUmum`,
  getTotalSaldoByPeriod: `${TATA_USAHA}:getTotalSaldoByPeriod`,
  getLastTransactionDate: `${TATA_USAHA}:getLastTransactionDate`,
  getInformasiToko: `${TATA_USAHA}:getInformasiToko`,
}

export const IPC_BUKTI_BELANJA = {
  getInformasiToko: `${BUKTI_BELANJA}:getInformasiToko`,
}
