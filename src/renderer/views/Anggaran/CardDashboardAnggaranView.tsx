import React, { FC } from 'react'

import BadgeComponent, { BadgeType } from 'renderer/components/BadgeComponent'

import CreateKertasKerjaView from './CreateKertasKerjaView'

import { CardDashboardType } from 'renderer/types/AnggaranType'

import {
  STATUS_KERTAS_KERJA,
  LABEL_STATUS_KERTAS_KERJA,
} from 'renderer/constants/anggaran'

import { Icon } from '@wartek-id/icon'
import { Tooltip } from '@wartek-id/tooltip'
import { Button } from '@wartek-id/button'

import { formatDateToString } from 'renderer/utils/date-formatting'

interface CardDashboardAnggaranProps {
  data: CardDashboardType
}

const CardDashboardAnggaranView: FC<CardDashboardAnggaranProps> = (
  props: CardDashboardAnggaranProps
) => {
  const { data } = props

  const isNotApproved = data.status === STATUS_KERTAS_KERJA.not_approved
  const isNotCreated = data.status === STATUS_KERTAS_KERJA.not_created
  const isDraft = data.status === STATUS_KERTAS_KERJA.draft
  const isWaitingAproval = data.status === STATUS_KERTAS_KERJA.waiting_approval

  const enableBtnDelete = isDraft || isNotApproved

  const handleDelete = () => {
    console.log('delete')
  }

  return (
    <div className="bg-gray-5 w-[900px] rounded-[10px] py-4 px-7 mb-5 h-[116px]">
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
              <div className="text-[20px]">
                Kertas Kerja BOS Reguler {data.tahun}
              </div>
              {isNotCreated && (
                <div className="text-tiny text-red-600">
                  Tenggat:
                  {formatDateToString(new Date(data.tenggat_waktu), 'DD/MM/YY')}
                </div>
              )}
              {isNotApproved && (
                <div className="text-tiny text-red-600">
                  Anda perlu segera melakukan revisi Kertas Kerja
                </div>
              )}
              {isWaitingAproval && (
                <div className="text-tiny text-blue-700">
                  Status diperbarui pada 14.50
                </div>
              )}
              {(data.type === 'perubahan' || data.type === 'pergeseran') && (
                <div className="text-tiny text-gray-900">
                  Ver. {data.type === 'perubahan' ? 'Perubahan' : 'Pergeseran'}{' '}
                  {formatDateToString(
                    new Date(data.tanggal_pengesahan),
                    'DD/MM/YY'
                  )}
                </div>
              )}
            </span>
            <span>
              {LABEL_STATUS_KERTAS_KERJA.filter(
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
        <span>
          {!isNotCreated && (
            <>
              <div className="flex">
                {isWaitingAproval && (
                  <Button
                    color="white"
                    size="sm"
                    variant="solid"
                    className="font-normal mr-10"
                    style={{ fontSize: '12px' }}
                  >
                    <Icon
                      as="i"
                      color="default"
                      fontSize="small"
                      className="mr-1"
                      style={{ fontSize: '16px' }}
                    >
                      refresh
                    </Icon>
                    Cek Status Terbaru
                  </Button>
                )}
                <div className="flex">
                  <div className="ml-6">
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
                        style={{ fontSize: '22px', color: '#45474a' }}
                      >
                        open_in_new
                      </Icon>
                    </Tooltip>
                  </div>
                  <div className="ml-6">
                    <Tooltip
                      content="Silakan hubungi dinas setempat untuk menghapus Kertas Kerja yang sudah disahkan."
                      placement="bottom"
                      strategy="fixed"
                      trigger="hover"
                      className="mr-6"
                    >
                      <Icon
                        as="button"
                        color="default"
                        fontSize="small"
                        style={{
                          fontSize: '22px',
                          color: enableBtnDelete ? '#45474a' : '#b3b5b7',
                        }}
                        disabled={enableBtnDelete ? false : true}
                        onClick={handleDelete}
                      >
                        delete
                      </Icon>
                    </Tooltip>
                  </div>
                  <div className="ml-6">
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
                        style={{ fontSize: '22px', color: '#45474a' }}
                      >
                        print
                      </Icon>
                    </Tooltip>
                  </div>
                </div>
              </div>
              {isWaitingAproval && (
                <div className="text-blue-700 text-[12px] text-right pt-10">
                  <b>“Cek Status Terbaru”</b> membutuhkan koneksi internet
                </div>
              )}
            </>
          )}
          {isNotCreated && (
            <>
              <div className="flex justify-end">
                <CreateKertasKerjaView />
              </div>
              <div className="text-blue-700 text-[12px] text-right pt-4">
                <b>“Buat Kertas Kerja”</b> membutuhkan koneksi internet
              </div>
            </>
          )}
        </span>
      </div>
    </div>
  )
}

export default CardDashboardAnggaranView
