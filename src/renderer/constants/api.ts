export const API_GET_TOKEN = '/token'
export const API_CHECK_HDD_VOL = (hdd_vol: string, hdd_vol_old: string) =>
  `/api/utils/check_hdd_vol/${hdd_vol}/${hdd_vol_old}`
export const API_INFO_CONNECTION = '/api/utils/info_connection'
export const API_GET_REFERENSI = (referensi: string, lastUpdate: string) =>
  `/api/referensi/${referensi}/last/${lastUpdate}`

export const API_GET_CONFIG_ALL = `/api/config/all`
export const API_GET_CONFIG = (varname: string) => `/api/config/all/${varname}`
