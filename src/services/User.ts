import { InstansiPengguna } from '../repositories/InstansiPengguna'
import { Pengguna } from '../repositories/Pengguna'
import { UserRole } from '../repositories/UserRole'
import { createQueryBuilder } from 'typeorm'

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
  const passMD5: string = password.toUpperCase()
  const getUser = await createQueryBuilder(UserRole, 'ur')
    .innerJoin(
      InstansiPengguna,
      'ip',
      'ur.instansi_pengguna_id = ip.instansi_pengguna_id'
    )
    .innerJoin(Pengguna, 'p', 'ip.pengguna_id = p.pengguna_id')
    .where('p.email = :email, p.password = :pass', {
      email: username,
      pass: passMD5,
    })
    .getOne()
  return getUser === undefined ? false : true
}
