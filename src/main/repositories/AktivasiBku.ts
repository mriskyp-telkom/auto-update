import { AktivasiBku } from 'main/models/AktivasiBku'
import { Connection } from 'typeorm'

export class AktivasiBkuRepository {
  private conn: Connection

  constructor(conn: Connection) {
    this.conn = conn
  }

  async BulkUpsert(bku: AktivasiBku[]) {
    return await this.conn
      .getRepository(AktivasiBku)
      .upsert(bku, ['idAnggaran', 'idPeriode'])
  }

  async GetListbyIDs(ids: string[]): Promise<AktivasiBku[]> {
    return await this.conn
      .getRepository(AktivasiBku)
      .createQueryBuilder()
      .where('id_anggaran IN (:...ids)', { ids })
      .getMany()
  }
}
