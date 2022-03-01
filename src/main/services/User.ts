import { InstansiPengguna } from '../repositories/InstansiPengguna'
import { Pengguna } from '../repositories/Pengguna'
import { UserRole } from '../repositories/UserRole'
import { AppConfig } from '../repositories/AppConfig'
import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import CommonUtils from '../utils/CommonUtils'
import { GetConfig } from './Config'

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
  const getAktif = await getRepository(AppConfig).findOne({
    where: { varname: 'active' },
  })
  const getKoregInvalid = await getRepository(AppConfig).findOne({
    where: { varname: 'koreg_invalid' },
  })
  const getRequestReset = await getRepository(AppConfig).findOne({
    where: { varname: 'requestReset' },
  })

  if (getAktif != null && getAktif.varvalue === '1') {
    const sessionId = await GetConfig('sessionId')
    if (sessionId !== null && sessionId !== undefined) {
      return 5 // auto login
    }
    return 2 // login
  } else if (getKoregInvalid != null && getKoregInvalid.varvalue === '1')
    return 3
  //koreg invalid
  else if (getRequestReset != null && getRequestReset.varvalue === '1') return 4
  //lockAccount
  else return 1 // registrasi
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

export const AddPengguna = async (
  pengguna: Pengguna
): Promise<InsertResult> => {
  return await getRepository(Pengguna).insert({
    penggunaId: pengguna.penggunaId,
    nama: pengguna.nama,
    tempatLahir: pengguna.tempatLahir,
    tanggalLahir: pengguna.tanggalLahir,
    jenisKelamin: pengguna.jenisKelamin,
    alamat: pengguna.alamat,
    kodePos: pengguna.kodePos,
    telepon: pengguna.telepon,
    showTelepon: pengguna.showTelepon,
    nip: pengguna.nip,
    kodeWilayah: pengguna.kodeWilayah,
    email: pengguna.email,
    password: pengguna.password,
    forgotPass1: pengguna.forgotPass1,
    forgotPass2: pengguna.forgotPass2,
    statusApproval: pengguna.statusApproval,
    softDelete: pengguna.softDelete,
    createDate: pengguna.createDate,
    lastUpdate: pengguna.lastUpdate,
    updaterId: pengguna.updaterId,
  })
}

export const AddUserRole = async (
  userRole: UserRole
): Promise<InsertResult> => {
  return await getRepository(UserRole).insert({
    userroleId: userRole.userroleId,
    roleId: userRole.roleId,
    instansiPenggunaId: userRole.instansiPenggunaId,
    softDelete: userRole.softDelete,
    createDate: userRole.createDate,
    lastUpdate: userRole.lastUpdate,
    updaterId: userRole.updaterId,
  })
}
