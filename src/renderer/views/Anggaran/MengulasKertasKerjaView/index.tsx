import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import styles from './index.module.css'

import clsx from 'clsx'

const MengulasKertasKerjaView: FC = () => {
  const navigate = useNavigate()

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  return (
    <div>
      <div className="flex justify-between pt-10 px-10 bg-gray-0">
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
            Mengulas Kertas Kerja
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[57px]"
            style={{ display: 'inline-block' }}
          >
            Bos reguler 2021
            <Tooltip
              content="BOS reguler 2021"
              placement="top"
              strategy="fixed"
              trigger="hover"
            >
              <span className="hidden">BOS reguler 2021</span>
            </Tooltip>
          </div>
          <div className="flex">
            <span className="mr-3">
              <div className="font-normal text-tiny text-gray-900 pb-1">
                Total Anggaran
              </div>
              <AmountCardComponent
                type="disabled"
                width={210}
                amount={300000000}
              />
            </span>
            <span>
              <div className="font-normal text-tiny text-gray-900 pb-1">
                Sisa Dana
              </div>
              <AmountCardComponent type="disabled" width={210} amount={0} />
            </span>
          </div>
        </span>
        <span>
          <div
            className={clsx(styles.pointKertasKerja, 'bg-gray-300 rounded p-6')}
          >
            <div className="mb-2">
              <Icon
                as="i"
                color="default"
                fontSize="small"
                style={{ fontSize: '14px' }}
                className="mr-[10px]"
              >
                info
              </Icon>
              Panduan
            </div>
            <ul className="list font-normal text-base text-gray-900 ml-7">
              <li>
                <span>
                  Di halaman ini Anda bisa memeriksa kembali anggaran belanja
                  sekolah yang telah dibuat.
                </span>
              </li>
              <li>
                <span>
                  Jika ada yang ingin diganti, klik tombol <b>“Edit”</b> untuk
                  melakukan edit.
                </span>
              </li>
              <li>
                <span>
                  Jika sudah sesuai, klik tombol <b>“Ajukan Pengesahan”</b>
                  untuk mengajukan pengesahan.
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-end pt-5 pb-3">
            <Button color="white" size="md" variant="solid" className="mr-3">
              <Icon
                as="i"
                color="default"
                fontSize="small"
                className="mr-1"
                style={{ fontSize: '18px', color: '#45474a' }}
              >
                search
              </Icon>
              Cari
            </Button>
            <Button color="white" size="md" variant="solid" className="mr-3">
              <Icon
                as="i"
                color="default"
                fontSize="small"
                className="mr-1"
                style={{ fontSize: '18px', color: '#45474a' }}
              >
                edit
              </Icon>
              Edit
            </Button>
            <Button color="white" size="md" variant="solid" className="mr-3">
              <Icon
                as="i"
                color="default"
                fontSize="small"
                className="mr-1"
                style={{ fontSize: '18px', color: '#45474a' }}
              >
                print
              </Icon>
              Cetak
            </Button>
            <Button color="blue" size="md" variant="solid">
              Ajukan Pengesahan
            </Button>
          </div>
          <div className="w-full flex text-center justify-end font-normal text-tiny text-blue-700 pb-4">
            <b>“Ajukan Pengesahan”</b> membutuhkan koneksi internet
          </div>
        </span>
      </div>
      <div className="bg-white px-10 h-full"></div>
    </div>
  )
}

export default MengulasKertasKerjaView
