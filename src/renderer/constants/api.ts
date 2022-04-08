export const API_GET_TOKEN = '/token'

export const API_CHECK_HDD_VOL = (hdd_vol: string, hdd_vol_old: string) =>
  `/api/utils/check_hdd_vol/${hdd_vol}/${hdd_vol_old}`

export const API_INFO_CONNECTION = '/api/utils/info_connection'

export const API_GET_REFERENSI = (referensi: string, lastUpdate: string) =>
  `/api/referensi/${referensi}/last/${lastUpdate}`

export const API_GET_REFERENSI_WILAYAH = (kodeWilayah: string) =>
  `/api/referensi/wilayah/${kodeWilayah}`

export const API_GET_CONFIG_ALL = `/api/config/all`

export const API_GET_CONFIG = (varname: string) => `/api/config/all/${varname}`

export const API_CHECK_ACTIVATION = (
  npsn: string,
  koreg: string,
  hdd_vol: string
) => `/api/utils/check_activation/${npsn}/${koreg}/${hdd_vol}`

export const API_REGISTRATION = '/api/user/registration'

export const API_GET_SEKOLAH = '/api/sekolah'

export const API_GET_CONFIG_PAGU = (idSumberDana: number, isRevisi: number) =>
  `/api/config/pagu/${idSumberDana}/${isRevisi}`

export const API_GET_PTK_LAST = (lastUpdate: string) =>
  `/api/sekolah/ptk_last/${lastUpdate}`

export const API_INIT_SYNC = '/api/sync/init'
export const API_POST_ANGGARAN = '/api/anggaran'
export const API_POST_PENJAB = '/api/rkas/penjab'
export const API_POST_RKAS = '/api/rkas'
export const API_POST_RKAS_DETAIL = '/api/rkas/detail'
export const API_POST_RKAS_PTK = '/api/rkas/ptk'
export const API_POST_RKAS_FINAL = '/api/rkas/final'