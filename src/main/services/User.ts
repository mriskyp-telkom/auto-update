import { InstansiPengguna } from '../repositories/InstansiPengguna'
import { Pengguna } from '../repositories/Pengguna'
import { UserRole } from '../repositories/UserRole'
import { AppConfig } from '../repositories/AppConfig'
import { createQueryBuilder, getRepository } from 'typeorm'
import CommonUtils from '../utils/CommonUtils'

export const CheckUser = async (username: string): Promise<boolean> => {
  const getUser = await createQueryBuilder(UserRole, 'ur')
    .innerJoin(
      InstansiPengguna,
      'ip',
      'ur.instansi_pengguna_id = ip.instansi_pengguna_id'
    )
    .innerJoin(Pengguna, 'p', 'ip.pengguna_id = p.pengguna_id')
    .where('p.email = :email', { email: username })
    .getOne()
  return getUser === undefined ? false : true
}

export const CheckUserPass = async (
  username: string,
  password: string
): Promise<boolean> => {
  const passMD5: string = CommonUtils.getMD5(password).toUpperCase()
  const getUser = await createQueryBuilder(UserRole, 'ur')
    .innerJoin(
      InstansiPengguna,
      'ip',
      'ur.instansi_pengguna_id = ip.instansi_pengguna_id'
    )
    .innerJoin(Pengguna, 'p', 'ip.pengguna_id = p.pengguna_id')
    .where('p.email = :email AND p.password = :pass', {
      email: username,
      pass: passMD5,
    })
    .getOne()
  return getUser === undefined ? false : true
}

export const CheckLogin = async (): Promise<number> => {
  const getAktif = (
    await getRepository(AppConfig).findOne({ where: { varname: 'active' } })
  ).varvalue
  const getKoregInvalid = (
    await getRepository(AppConfig).findOne({
      where: { varname: 'koreg_invalid' },
    })
  ).varvalue
  const getRequestReset = (
    await getRepository(AppConfig).findOne({
      where: { varname: 'requestReset' },
    })
  ).varvalue
  if (getAktif === '1') return 2
  else if (getKoregInvalid === '1') return 3
  else if (getRequestReset === '1') return 4
  else return 1
}

export const GetUserRole = async (username: string): Promise<UserRole> => {
  const getUser = await createQueryBuilder(UserRole, 'ur')
    .innerJoin(
      InstansiPengguna,
      'ip',
      'ur.instansi_pengguna_id = ip.instansi_pengguna_id'
    )
    .innerJoin(Pengguna, 'p', 'ip.pengguna_id = p.pengguna_id')
    .where('p.email = :email', { email: username })
    .getOne()
  return getUser
}
