import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import TabelTataUsahaView from './TabelTataUsahaView'
import CardTotalDanaView from './CardTotalDanaView'

import PanduanTutupBKUView from 'renderer/views/TataUsaha/Panduan/PanduanTutupBKUView'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { DASHBOARD_BKU_PAGE_URL } from 'renderer/constants/routes'

import { formatDateTimeStatus } from 'renderer/utils/date-formatting'
import clsx from 'clsx'

const DetailTataUsahaView: FC = () => {
  const navigate = useNavigate()

  const lastUpdate = new Date()

  const handleBackToBeranda = () => {
    navigate(DASHBOARD_BKU_PAGE_URL)
  }

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
            BKU Maret 2021
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
            Bos reguler 2021
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
        <div className="pb-6">
          <CardTotalDanaView />
        </div>
        <TabelTataUsahaView />
      </div>
    </div>
  )
}

export default DetailTataUsahaView
