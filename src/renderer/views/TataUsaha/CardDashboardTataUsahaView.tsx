import React, { FC } from 'react'

import InformationCardComponent from 'renderer/components/Card/InformationCardComponent'
import BadgeComponent, { BadgeType } from 'renderer/components/BadgeComponent'
import AktivasiBKUView from 'renderer/views/TataUsaha/Aktivasi/AktivasiBKUView'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import { DATA_BULAN } from 'renderer/constants/general'
import {
  STATUS_BKU_PERTAHUN,
  LABEL_STATUS_BKU_PERTAHUN,
  STATUS_BKU_PERBULAN,
  LABEL_STATUS_BKU_PERBULAN,
} from 'renderer/constants/tata-usaha'

import {
  BKUCardDashboardTahunType,
  BKUCardDashboardBulanType,
} from 'renderer/types/TataUsahaType'

import filter from 'lodash/filter'
import clsx from 'clsx'

interface CardBulanProps {
  data: BKUCardDashboardBulanType
  status_pertahun: string
}

interface CardDashboardTataUsahaProps {
  data: BKUCardDashboardTahunType
}

const CardBulan: FC<CardBulanProps> = (props: CardBulanProps) => {
  const { data } = props

  const isDisabled = data.status === undefined

  const status = isDisabled ? STATUS_BKU_PERBULAN.not_created : data.status

  const color = isDisabled ? 'bg-gray-10 text-gray-500' : 'bg-white'

  const classStatus = color + ' border-gray-500'

  return (
    <div
      className={clsx(
        color,
        'rounded shadow-custom1 py-3 px-5 w-[177px] capitalize-first'
      )}
    >
      <div className="flex justify-center mb-3">
        {data.status === STATUS_BKU_PERBULAN.done && (
          <Icon as="i" className="mr-2" color="default" fontSize="default">
            done
          </Icon>
        )}
        {data.bulan}
      </div>
      <div className="flex justify-center">
        {LABEL_STATUS_BKU_PERBULAN.filter((item) => item.status === status).map(
          (status, index) => (
            <BadgeComponent
              key={index}
              type={isDisabled ? 'custom' : (status.type as BadgeType)}
              label={status.label}
              class={classStatus}
            />
          )
        )}
      </div>
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

  const showBulan = data.bulan.length > 0
  const showThreeButton = !isNotActive && showBulan

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
                {LABEL_STATUS_BKU_PERTAHUN.filter(
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
                <AktivasiBKUView />
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
          <InformationCardComponent
            text="BKU terkunci karena sedang dalam proses perubahan/pergeseran"
            class="mt-4"
          />
        )}
      </div>
      {showBulan && (
        <div>
          <div className="border-b mb-1 border-gray-200"></div>
          <div className="grid grid-cols-4 gap-x-12 gap-y-7 py-4 px-7">
            {DATA_BULAN.map((bulan, index) => {
              const filtered = filter(data.bulan, ['bulan', bulan.name])
              const bulanStatus = {
                bulan: bulan.name,
                status: filtered[0]?.status,
              }
              return (
                <CardBulan
                  key={index}
                  data={bulanStatus}
                  status_pertahun={data.status}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardDashboardTataUsahaView
