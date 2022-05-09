import { KasUmum } from 'main/models/KasUmum'
import { Connection, Like, Repository } from 'typeorm'

export class KasUmumRepository {
  private conn: Connection
  private repo: Repository<KasUmum>

  constructor(conn: Connection) {
    this.conn = conn
    this.repo = conn.getRepository(KasUmum)
  }

  async Upsert(kasUmum: KasUmum) {
    return await this.repo.upsert(kasUmum, ['idKasUmum'])
  }

  async BulkInsert(kasUmumList: KasUmum[]) {
    return await this.repo.insert(kasUmumList)
  }

  async GetNextNoBukti(kodeBku: string): Promise<string> {
    const latestNoBukti = await this.repo.findOne({
      noBukti: Like(`${kodeBku}%`),
    })
    if (latestNoBukti === undefined) {
      return `${kodeBku}01`
    }

    const matches = latestNoBukti.noBukti.replace(/[^0-9]/g, '')
    let parsed = parseInt(matches, 10)
    if (isNaN(parsed)) {
      return `${kodeBku}01`
    }

    parsed++
    return kodeBku + parsed.toString().padStart(2, '0')
  }
}
