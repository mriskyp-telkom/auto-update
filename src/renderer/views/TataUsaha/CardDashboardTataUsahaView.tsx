import React, { FC } from 'react'

import InformationCardComponent from 'renderer/components/Card/InformationCardComponent'
import BadgeComponent, { BadgeType } from 'renderer/components/BadgeComponent'
import AktivasiBKUView from 'renderer/views/TataUsaha/Aktivasi/AktivasiBKUView'

import { Button } from '@wartek-id/button'
import { Icon } from '@wartek-id/icon'

import { DATA_BULAN } from 'renderer/constants/general'
import {
  LABEL_STATUS_BKU_PERTAHUN,
  LABEL_STATUS_BKU_PERBULAN,
} from 'renderer/constants/tata-usaha'
import { STATUS_BKU_PERBULAN, STATUS_BKU_PERTAHUN } from 'global/constants'

import {
  BKUCardDashboardTahunType,
  BKUCardDashboardBulanType,
} from 'renderer/types/TataUsahaType'

import filter from 'lodash/filter'
import clsx from 'clsx'
import { formatDateToString } from 'renderer/utils/date-formatting'

interface CardBulanProps {
  data: BKUCardDashboardBulanType
  status_pertahun: string
}

interface CardDashboardTataUsahaProps {
  data: BKUCardDashboardTahunType
  sumberDana: number
  tahunAktif: number
}

const CardBulan: FC<CardBulanProps> = (props: CardBulanProps) => {
  const { data } = props

  const isDisabled = data.status === undefined

  const showStatus =
    props.status_pertahun === STATUS_BKU_PERTAHUN.active ||
    props.status_pertahun === STATUS_BKU_PERTAHUN.done

  const status = isDisabled ? STATUS_BKU_PERBULAN.not_created : data.status

  const color = isDisabled ? 'bg-gray-10 text-gray-500' : 'bg-white'

  const classStatus = color + ' border-gray-500'

  return (
    <div
      className={clsx(
        color,
        'rounded shadow-card py-3 px-5 w-[177px] capitalize-first'
      )}
    >
      <div className="flex justify-center">
        {data.status === STATUS_BKU_PERBULAN.done && (
          <Icon as="i" className="mr-2" color="default" fontSize="default">
            done
          </Icon>
        )}
        {data.bulan}
      </div>
      {showStatus && (
        <div className="flex justify-center mt-3">
          {LABEL_STATUS_BKU_PERBULAN.filter(
            (item) => item.status === status
          ).map((status, index) => (
            <BadgeComponent
              key={index}
              type={isDisabled ? 'custom' : (status.type as BadgeType)}
              label={status.label}
              class={classStatus}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const CardDashboardTataUsahaView: FC<CardDashboardTataUsahaProps> = (
  props: CardDashboardTataUsahaProps
) => {
  const { data, sumberDana, tahunAktif } = props

  const isNotActive = data.status === STATUS_BKU_PERTAHUN.not_active
  const isDone = data.status === STATUS_BKU_PERTAHUN.done
  const isActive = data.status === STATUS_BKU_PERTAHUN.active
  const isTempInactive = data.status === STATUS_BKU_PERTAHUN.temporary_inactive
  const isDateOver = data.status === STATUS_BKU_PERTAHUN.date_over

  const showBulan = isActive || data.tahun === tahunAktif
  const showBtnList = !isNotActive && showBulan
  const showBtnCetak = isDone || isActive

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
                <AktivasiBKUView
                  sumberDana={sumberDana}
                  idAnggaran={data.idAnggaran}
                  isAnggaranApproved={data.isAnggaranApproved}
                />
                <div className="text-blue-700 text-[12px] text-right pt-2">
                  <b>“Aktivasi BKU”</b> membutuhkan koneksi internet
                </div>
              </div>
            )}
            {showBtnCetak && (
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
            {showBtnList && (
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
        {isDateOver && (
          <div
            style={{ padding: 'unset', paddingTop: '20px', textAlign: 'right' }}
            className="text-gray-500 text-tiny place-self-end"
          >
            BKU tidak dapat dibuat karena melewati tenggat{' '}
            {formatDateToString(new Date(data.tahun + '-12-30'))}
          </div>
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
