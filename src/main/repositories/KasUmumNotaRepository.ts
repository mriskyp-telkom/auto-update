import { KasUmumNota } from 'main/models/KasUmumNota'
import { NamaToko } from 'main/types/TataUsaha'
import { Connection, Repository } from 'typeorm'

export class KasUmumNotaRepository {
  private conn: Connection
  private repo: Repository<KasUmumNota>

  constructor(conn: Connection) {
    this.conn = conn
    this.repo = conn.getRepository(KasUmumNota)
  }

  async GetTokoByName(name: string): Promise<KasUmumNota> {
    return await this.repo.findOne(
      { namaToko: name, softDelete: 0 },
      { order: { createDate: 'DESC' } }
    )
  }

  async GetListToko(): Promise<NamaToko[]> {
    return await this.repo
      .createQueryBuilder()
      .select('nama_toko AS namaToko')
      .distinct(true)
      .where('soft_delete = 0')
      .orderBy('nama_toko')
      .getRawMany()
  }
}
