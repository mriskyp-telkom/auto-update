export const API_GET_TOKEN = '/token'
export const API_CHECK_HDD_VOL = (hdd_vol: string) =>
  `/api/utils/check_hdd_vol/${hdd_vol}/${hdd_vol}`
