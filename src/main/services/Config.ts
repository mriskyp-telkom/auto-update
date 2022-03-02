import { getRepository, InsertResult, DeleteResult } from 'typeorm'
import { AppConfig } from 'main/repositories/AppConfig'

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
  return (
    (await getRepository(AppConfig).findOne({ varname: varname }))?.varvalue ??
    ''
  )
}

export const DeleteConfig = async (varname: string): Promise<DeleteResult> => {
  return await getRepository(AppConfig).delete({ varname: varname })
}

export const SetBulkConfig = async (data: any): Promise<InsertResult> => {
  return await getRepository(AppConfig).upsert(data, ['varname'])
}
