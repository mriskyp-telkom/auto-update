import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import BadgeComponent, { BadgeType } from 'renderer/components/BadgeComponent'
import CreateKertasKerjaView from './CreateKertasKerjaView'
import CekStatusKKView from 'renderer/views/Anggaran/CekStatus/CekStatusKKView'

import { KKCardDashboardType } from 'renderer/types/AnggaranType'

import { LABEL_STATUS_KERTAS_KERJA } from 'renderer/constants/anggaran'
import { Icon } from '@wartek-id/icon'
import { Tooltip } from '@wartek-id/tooltip'

import {
  formatDateToString,
  formatDateTimeStatus,
} from 'renderer/utils/date-formatting'
import { STATUS_KERTAS_KERJA, VERSI_ANGGARAN } from 'global/constants'

interface CardDashboardAnggaranProps {
  data: KKCardDashboardType
}

const CardDashboardAnggaranView: FC<CardDashboardAnggaranProps> = (
  props: CardDashboardAnggaranProps
) => {
  const navigate = useNavigate()

  const { data } = props

  const isNotApproved = data.status === STATUS_KERTAS_KERJA.not_approved
  const isNotCreated = data.status === STATUS_KERTAS_KERJA.not_created
  const isDraft = data.status === STATUS_KERTAS_KERJA.draft
  const isWaitingAproval = data.status === STATUS_KERTAS_KERJA.waiting_approval
  const isDisabled = data.status === STATUS_KERTAS_KERJA.disabled
  const isApproved = data.status === STATUS_KERTAS_KERJA.approved

  const enableBtnDelete = isDraft || isNotApproved
  const isDisplayTenggat = isDraft

  const enableVerDate =
    isApproved && (data.type === 'perubahan' || data.type === 'pergeseran')
  const enable3Icons = !isNotCreated && !isDisabled

  const handleDelete = () => {
    //action delete
  }

  const handleOpen = () => {
    const link = `/anggaran/menyusun/update/${encodeURIComponent(
      data.id_anggaran
    )}`
    navigate(link)
  }

  return (
    <div className="grid bg-gray-5 w-[900px] rounded-[10px] py-4 px-7 mb-5 h-[116px]">
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
              <div className="text-[20px]">RKAS BOS Reguler {data.tahun}</div>
              {isDisplayTenggat && (
                <div className="text-tiny text-blue-700">
                  Ajukan pengesahan sebelum{' '}
                  {formatDateToString(new Date(data.tenggat_waktu))}
                </div>
              )}
              {isNotApproved && (
                <div className="text-tiny text-red-600">
                  Anda perlu segera melakukan revisi RKAS
                </div>
              )}
              {isWaitingAproval && (
                <div className="text-tiny text-blue-700">
                  Status diperbarui{' '}
                  {formatDateTimeStatus(new Date(data.status_updated_at))}
                </div>
              )}
              {enableVerDate && (
                <div className="text-tiny text-gray-900">
                  Ver.{' '}
                  {data.type === VERSI_ANGGARAN.perubahan.code
                    ? VERSI_ANGGARAN.perubahan.label
                    : VERSI_ANGGARAN.pergeseran.label}{' '}
                  {formatDateToString(new Date(data.tanggal_pengesahan))}
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
          {enable3Icons && (
            <>
              <div className="flex">
                {isWaitingAproval && (
                  <CekStatusKKView idAnggaran={data.id_anggaran} />
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
                        as="button"
                        color="default"
                        fontSize="small"
                        style={{ fontSize: '22px', color: '#45474a' }}
                        onClick={handleOpen}
                      >
                        open_in_new
                      </Icon>
                    </Tooltip>
                  </div>
                  <div className="ml-6">
                    <Tooltip
                      content="Silakan hubungi dinas setempat untuk menghapus RKAS yang sudah disahkan."
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
                <CreateKertasKerjaView idSumberDana={data.id_sumber_dana} />
              </div>
              <div className="text-blue-700 text-[12px] text-right pt-4">
                <b>“Buat RKAS”</b> membutuhkan koneksi internet
              </div>
            </>
          )}
        </span>
      </div>
      {isDisabled && (
        <div className="text-gray-500 text-tiny place-self-end">
          RKAS tidak dapat dibuat karena melewati tenggat{' '}
          {formatDateToString(new Date(data.tenggat_waktu))}
        </div>
      )}
    </div>
  )
}

export default CardDashboardAnggaranView
