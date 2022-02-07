import React, { FC } from 'react'

import BadgeComponent, { BadgeType } from 'components/BadgeComponent'

import CreateKertasKerjaView from './CreateKertasKerjaView'

import { STATUS_KERTAS_KERJA } from 'constants/anggaran'

import { Icon } from '@wartek-id/icon'
import { Tooltip } from '@wartek-id/tooltip'

interface CardDashboardAnggaranProps {
  title: string
  status: string
}

const CardDashboardAnggaranView: FC<CardDashboardAnggaranProps> = (
  props: CardDashboardAnggaranProps
) => {
  const ready = props.status === 'approved' ? true : false

  return (
    <div className="bg-gray-5 rounded-[10px] py-4 px-7 mb-5">
      <div className="flex justify-between">
        <span>
          <span className="mr-7">{props.title}</span>
          {STATUS_KERTAS_KERJA.filter(
            (data) => data.status === props.status
          ).map((status, index) => (
            <BadgeComponent
              key={index}
              type={status.type as BadgeType}
              label={status.label}
            />
          ))}
        </span>
        {ready && (
          <div className="flex">
            <div className="mr-6">
              <Tooltip
                content="Buka"
                placement="bottom"
                strategy="fixed"
                trigger="hover"
              >
                <Icon
                  as="i"
                  color="default"
                  fontSize="small"
                  style={{ fontSize: '18px' }}
                >
                  open_in_new
                </Icon>
              </Tooltip>
            </div>
            <div className="mr-6">
              <Tooltip
                content="Silakan hubungi dinas setempat untuk menghapus Kertas Kerja yang sudah disahkan."
                placement="bottom"
                strategy="fixed"
                trigger="hover"
                className="mr-6"
              >
                <Icon
                  as="i"
                  color="default"
                  fontSize="small"
                  style={{ fontSize: '18px' }}
                >
                  delete
                </Icon>
              </Tooltip>
            </div>
            <div className="mr-6">
              <Tooltip
                content="Cetak"
                placement="bottom"
                strategy="fixed"
                trigger="hover"
              >
                <Icon
                  as="i"
                  color="default"
                  fontSize="small"
                  style={{ fontSize: '18px' }}
                >
                  print
                </Icon>
              </Tooltip>
            </div>
          </div>
        )}
        {!ready && <CreateKertasKerjaView />}
      </div>
      {!ready && (
        <div className="text-blue-700 text-[12px] text-right pt-4">
          <b>“Buat Kertas Kerja”</b> membutuhkan koneksi internet
        </div>
      )}
    </div>
  )
}

export default CardDashboardAnggaranView
