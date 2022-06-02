import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import TabelTataUsahaView from './TabelTataUsahaView'
import CardTotalDanaView from './CardTotalDanaView'
import CardDanaPembelanjaanView from './CardDanaPembelanjaanView'

import PanduanTutupBKUView from 'renderer/views/TataUsaha/Panduan/PanduanTutupBKUView'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { DASHBOARD_BKU_PAGE_URL } from 'renderer/constants/routes'

import { formatDateTimeStatus } from 'renderer/utils/date-formatting'

import clsx from 'clsx'
import { DATA_BULAN } from 'renderer/constants/general'
import syncToIpcMain from 'renderer/configs/ipc'
import { IPC_ANGGARAN } from 'global/ipc'

const DetailTataUsahaView: FC = () => {
  const navigate = useNavigate()
  const { q_id_anggaran, q_id_periode } = useParams()
  const [tahun, setTahun] = useState('')
  const lastUpdate = new Date()
  const cardTotalDanaDataProps = {
    idAnggaran: q_id_anggaran,
    idPeriode: parseInt(q_id_periode),
  }
  const handleBackToBeranda = () => {
    navigate(DASHBOARD_BKU_PAGE_URL)
  }
  const bulan = DATA_BULAN.find((b: any) => b.id === parseInt(q_id_periode))

  useEffect(() => {
    const anggaran = syncToIpcMain(IPC_ANGGARAN.getAnggaranById, q_id_anggaran)
    setTahun(anggaran.tahunAnggaran)
  }, [])

  return (
    <div>
      <div className="flex justify-between pt-10 pb-4 px-10 bg-gray-0">
        <span>
          <div className="flex items-center text-[12px] font-semibold text-blue-700 mb-[12px]">
            <Icon
              as="i"
              color="default"
              fontSize="default"
              className="mr-[10px]"
              style={{ color: '#054BCC' }}
              onClick={handleBackToBeranda}
            >
              keyboard_backspace
            </Icon>
            <span className="cursor-pointer" onClick={handleBackToBeranda}>
              Kembali ke Beranda
            </span>
          </div>
          <div className="flex items-center text-[22px] font-semibold">
            BKU <span className="capitalize mr-1 ml-1"> {bulan?.name} </span>{' '}
            {tahun}
            <Icon
              as="button"
              color="default"
              fontSize="small"
              className="ml-[10px]"
              style={{ color: '#054BCC' }}
            >
              delete
            </Icon>
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[57px]"
            style={{ display: 'inline-block' }}
          >
            Bos reguler {tahun}
          </div>
        </span>
        <span>
          <PanduanTutupBKUView />
          <div className="flex justify-end pt-5">
            <Button color="white" size="md" variant="solid" className="mr-3">
              <Icon as="i" color="default" fontSize="default">
                add
              </Icon>
              Tambah Pembelanjaan
            </Button>
            <Button color="black" size="md" variant="solid">
              Tutup BKU
            </Button>
          </div>
          <div className="w-full flex text-center justify-end font-normal text-tiny text-blue-700 pt-3">
            <b>“Tutup BKU”</b> membutuhkan koneksi internet
          </div>
        </span>
      </div>
      <div className="bg-white px-10 h-full">
        <div
          className={clsx(
            'w-full flex text-center justify-end',
            'font-normal text-tiny text-blue-700 pb-4 pt-[14px]'
          )}
        >
          <Icon
            as="i"
            color="default"
            fontSize="default"
            className="ml-[6px]"
            style={{ fontSize: '18px', color: '#0B5FEF' }}
          >
            done
          </Icon>
          Tersimpan otomatis {formatDateTimeStatus(new Date(lastUpdate))}
        </div>
        <div className="flex pb-6">
          <CardTotalDanaView class="mr-4" data={cardTotalDanaDataProps} />
          <CardDanaPembelanjaanView data={cardTotalDanaDataProps} />
        </div>
        <TabelTataUsahaView
          idAnggaran={q_id_anggaran}
          idPeriode={parseInt(q_id_periode)}
        />
      </div>
    </div>
  )
}

export default DetailTataUsahaView
