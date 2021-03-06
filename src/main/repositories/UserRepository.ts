import { InstansiPengguna } from 'main/models/InstansiPengguna'
import { Pengguna } from 'main/models/Pengguna'
import { UserRole } from 'main/models/UserRole'
import { createQueryBuilder, getRepository, InsertResult } from 'typeorm'
import CommonUtils from 'main/utils/CommonUtils'
import { GetConfig } from 'main/repositories/ConfigRepository'
import { Token } from 'main/models/Token'

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
  const getAktif = await GetConfig('active')
  const getKoregInvalid = await GetConfig('koreg_invalid')
  const getRequestReset = await GetConfig('requestReset')

  if (getAktif == '1') {
    const sessionId = await GetConfig('sessionId')
    if (sessionId != '') {
      return 5 // auto login
    }
    return 2 // login
  } else if (getKoregInvalid == '1') return 3
  //koreg invalid
  else if (getRequestReset == '1') return 4
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

export const GetPenggunaByEmail = async (email: string): Promise<Pengguna> => {
  const getPengguna = await createQueryBuilder(Pengguna, 'p')
    .where('p.email = :email', { email })
    .getOne()
  return getPengguna
}

export const GetPenggunaByToken = async (token: string): Promise<Pengguna> => {
  const getPengguna = await createQueryBuilder(Pengguna, 'p')
    .innerJoin(InstansiPengguna, 'ip', 'ip.pengguna_id = p.pengguna_id')
    .innerJoin(
      UserRole,
      'ur',
      'ur.instansi_pengguna_id = ip.instansi_pengguna_id'
    )
    .innerJoin(Token, 't', 't.userrole_id = ur.userrole_id')
    .where('t.token_id = :token', { token })
    .getOne()
  return getPengguna
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
