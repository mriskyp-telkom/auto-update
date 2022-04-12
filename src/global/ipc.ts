export const ANGGARAN = 'anggaran'
export const PENJAB = 'penjab'
export const PTK = 'ptk'
export const REFERENSI = 'referensi'
export const KK = 'kk'

export const IPC_ANGGARAN = {
  getAnggaranById: `${ANGGARAN}:getAnggaranById`,
  getPagu: `${ANGGARAN}:getPagu`,
  getTotalAnggaran: `${ANGGARAN}:getTotalAnggaran`,
}

export const IPC_PENJAB = {
  getPenjabById: `${PENJAB}:getPenjabById`,
}

export const IPC_PTK = {
  getPtk: `${PTK}:getPtk`,
}

export const IPC_REFERENSI = {
  getRefBarangByRekening: `${REFERENSI}:getRefBarangByRekening`,
  getRefKode: `${REFERENSI}:getRefKode`,
  getRefRekening: `${REFERENSI}:getRefRekening`,

  addBulkRefSatuan: `${REFERENSI}:addBulkRefSatuan`,
  getRefSatuan: `${REFERENSI}:getRefSatuan`,
}

export const IPC_KK = {
  anggaranDetailKegiatan: `${KK}:anggaranDetailKegiatan`,
  addAnggaranDetailKegiatan: `${KK}:addAnggaranDetailKegiatan`,
  getAnggaranDetailKegiatan: `${KK}:getAnggaranDetailKegiatan`,

  getRapbsBulan: `${KK}:getRapbsBulan`,
  getRapbsLastUpdate: `${KK}:getRapbsLastUpdate`,
  getRapbsSummary: `${KK}:getRapbsSummary`,
  deleteRapbsByRapbsId: `${KK}:deleteRapbsByRapbsId`,
}
