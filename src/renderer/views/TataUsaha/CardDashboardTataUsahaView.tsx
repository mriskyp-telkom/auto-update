import React, { FC } from 'react'

import InformationCardComponent from 'renderer/components/Card/InformationCardComponent'
import BadgeComponent, { BadgeType } from 'renderer/components/BadgeComponent'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import { DATA_BULAN } from 'renderer/constants/general'
import {
  STATUS_BKU_PERTAHUN,
  LABEL_STATUS_BKU,
} from 'renderer/constants/tata-usaha'

import { BKUCardDashboardType } from 'renderer/types/TataUsahaType'

interface CardBulanProps {
  bulan: string
}

interface CardDashboardTataUsahaProps {
  data: BKUCardDashboardType
}

const CardBulan: FC<CardBulanProps> = (props: CardBulanProps) => {
  return (
    <div className="rounded shadow-custom1 py-3 px-5 w-[177px] h-[48px] text-center capitalize-first">
      {props.bulan}
    </div>
  )
}

const CardDashboardTataUsahaView: FC<CardDashboardTataUsahaProps> = (
  props: CardDashboardTataUsahaProps
) => {
  const { data } = props

  const isNotActive = data.status === STATUS_BKU_PERTAHUN.not_active
  const isDone = data.status === STATUS_BKU_PERTAHUN.done
  const isTempInactive = data.status === STATUS_BKU_PERTAHUN.temporary_inactive

  const showThreeButton = !isNotActive && data.show_bulan

  const handleClick = () => {
    //handle
  }

  return (
    <div className="mb-5 bg-gray-5 w-[900px] rounded-large">
      <div className="py-4 px-7">
        <div className="flex justify-between">
          <span>
            <div className="flex">
              <span>
                <img
                  className="inline-block mr-4"
                  src="./assets/icons/document.svg"
                />
              </span>
              <span className="mr-7">
                <div className="text-[20px]">BKU BOS Reguler {data.tahun}</div>
              </span>
              <span>
                {LABEL_STATUS_BKU.filter(
                  (item) => item.status === data.status
                ).map((status, index) => (
                  <BadgeComponent
                    key={index}
                    type={status.type as BadgeType}
                    label={status.label}
                  />
                ))}
              </span>
            </div>
          </span>
          <span className="flex">
            {isNotActive && (
              <div className="grid justify-items-end">
                <Button
                  color="black"
                  size="md"
                  variant="solid"
                  onClick={handleClick}
                >
                  Aktivasi BKU
                </Button>
                <div className="text-blue-700 text-[12px] text-right pt-2">
                  <b>“Aktivasi BKU”</b> membutuhkan koneksi internet
                </div>
              </div>
            )}
            {showThreeButton && (
              <Button
                color="white"
                size="md"
                variant="solid"
                onClick={handleClick}
              >
                <Icon as="i" color="default" fontSize="small" className="mr-1">
                  delete
                </Icon>
                Hapus
              </Button>
            )}
            {isDone && (
              <Button
                color="white"
                size="md"
                variant="solid"
                onClick={handleClick}
                className="ml-3"
              >
                <Icon as="i" color="default" fontSize="small" className="mr-1">
                  print
                </Icon>
                Cetak
              </Button>
            )}
            {showThreeButton && (
              <Button
                color="white"
                size="md"
                variant="solid"
                onClick={handleClick}
                className="ml-3"
              >
                Daftar Penerimaan Dana
              </Button>
            )}
          </span>
        </div>
        {isTempInactive && (
          <InformationCardComponent text="BKU terkunci karena sedang dalam proses perubahan/pergeseran" />
        )}
      </div>
      {data.show_bulan && (
        <div>
          <div className="border-b mb-1 border-gray-200"></div>
          <div className="grid grid-cols-4 gap-x-12 gap-y-7 py-4 px-7">
            {DATA_BULAN.map((bulan, index) => (
              <CardBulan key={index} bulan={bulan.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardDashboardTataUsahaView
