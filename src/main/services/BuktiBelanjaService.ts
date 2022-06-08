import { InformasiToko } from 'global/types/BuktiBelanjaType'
import { KasUmumNota } from 'main/models/KasUmumNota'
import { KasUmumNotaRepository } from 'main/repositories/KasUmumNotaRepository'
import { Result, ok, err } from 'neverthrow'
import { Connection } from 'typeorm'

export class BuktiBelanjaService {
  private kasUmumNotaRepo: KasUmumNotaRepository

  constructor(conn: Connection) {
    this.kasUmumNotaRepo = new KasUmumNotaRepository(conn)
  }

  async GetInformasiToko(
    namaToko: string
  ): Promise<Result<InformasiToko, Error>> {
    let kasUmumNota: KasUmumNota

    try {
      kasUmumNota = await this.kasUmumNotaRepo.GetTokoByName(namaToko)
    } catch (error) {
      return err(new Error(error))
    }

    if (kasUmumNota === undefined) {
      return err(new Error('not found'))
    }

    const result = <InformasiToko>{
      nama: kasUmumNota.namaToko,
      npwp: kasUmumNota.npwp,
    }

    let phoneNumber = ''

    const additionalInformation = kasUmumNota.alamatToko.split('|')
    if (additionalInformation[0] !== undefined) {
      result.alamat = additionalInformation[0]
    }

    // no hp
    if (
      additionalInformation[3] !== undefined &&
      additionalInformation[3] !== ''
    ) {
      phoneNumber = additionalInformation[3]
    } else {
      // no telp
      if (additionalInformation[1] !== undefined) {
        phoneNumber = phoneNumber + additionalInformation[1]
      }

      if (additionalInformation[2] !== undefined) {
        phoneNumber = phoneNumber + additionalInformation[2]
      }
    }

    result.telpon = phoneNumber
    return ok(result)
  }
}
