export const ANGGARAN = 'anggaran'
export const PENJAB = 'penjab'
export const PTK = 'ptk'
export const REFERENSI = 'referensi'
export const KK = 'kk'
export const IPC_ANGGARAN = {
  getAnggaranById: `${ANGGARAN}:getAnggaranById`,
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
}

export const IPC_KK = {
  getRapbsSummary: `${KK}:getRapbsSummary`,
  anggaranDetailKegiatan: `${KK}:anggaranDetailKegiatan`,
}
