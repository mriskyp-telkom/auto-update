import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'

import PanduanTutupBKUView from 'renderer/views/TataUsaha/Panduan/PanduanTutupBKUView'

import { DASHBOARD_BKU_PAGE_URL } from 'renderer/constants/routes'

const DetailTataUsahaView: FC = () => {
  const navigate = useNavigate()

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
        </span>
      </div>
    </div>
  )
}

export default DetailTataUsahaView
