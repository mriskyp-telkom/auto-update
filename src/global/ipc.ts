export const ANGGARAN = 'anggaran'
export const PENJAB = 'penjab'
export const PTK = 'ptk'
export const REFERENSI = 'referensi'

export const IPC_ANGGARAN = {
  getAnggaranById: `${ANGGARAN}:getAnggaranById`,
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
