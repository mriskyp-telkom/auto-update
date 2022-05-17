import { AktivasiBku } from 'main/models/AktivasiBku'
import { Anggaran } from 'main/models/Anggaran'
import { STATUS_BKU_PERBULAN, STATUS_BKU_PERTAHUN } from './constants'

export function GetStatusAktivasiBku(aktivasiBku: AktivasiBku | null): string {
  if (aktivasiBku === null) {
    return STATUS_BKU_PERBULAN.not_created
  }

  if (
    aktivasiBku.tanggalAktivasi !== null &&
    aktivasiBku.tanggalFinish != null
  ) {
    return STATUS_BKU_PERBULAN.done
  }

  if (aktivasiBku.tanggalAktivasi !== null) {
    return STATUS_BKU_PERBULAN.draft
  }

  return 'undefined'
}

export function GetStatusAnggaran(
  anggaran: Anggaran,
  aktivasiBkuList: AktivasiBku[]
): string {
  if (anggaran.isRevisi > 0 && anggaran.tanggalPengesahan === null) {
    return STATUS_BKU_PERTAHUN.temporary_inactive
  }

  let finished = 0
  let notCreated = 0
  for (const bku of aktivasiBkuList) {
    const bkuStatus = GetStatusAktivasiBku(bku)
    if (bkuStatus === STATUS_BKU_PERBULAN.not_created) {
      notCreated++
      continue
    }

    if (bkuStatus === STATUS_BKU_PERBULAN.done) {
      finished++
      continue
    }

    if (bkuStatus === STATUS_BKU_PERBULAN.draft) {
      return STATUS_BKU_PERTAHUN.active
    }
  }

  if (finished === 12) {
    return STATUS_BKU_PERTAHUN.done
  }

  if (
    anggaran.tanggalPengesahan === null ||
    notCreated === 12 ||
    aktivasiBkuList.length === 0
  ) {
    return STATUS_BKU_PERTAHUN.not_active
  }

  return 'undefined'
}
