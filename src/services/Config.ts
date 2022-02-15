import { getRepository, InsertResult } from 'typeorm'
import { AppConfig } from '../repositories/AppConfig'

export const SetConfig = async (
  varname: string,
  varvalue: string
): Promise<InsertResult> => {
  return await getRepository(AppConfig).upsert(
    [{ varname: varname, varvalue: varvalue }],
    ['varname']
  )
}

export const GetConfig = async (varname: string): Promise<string> => {
  return (await getRepository(AppConfig).findOne({ varname: varname })).varvalue
}
