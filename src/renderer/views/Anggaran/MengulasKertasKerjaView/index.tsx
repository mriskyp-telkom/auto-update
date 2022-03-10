import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import DropdownComponent from 'renderer/components/DropdownComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import TabelMengulasKertasKerjaView from './TabelMengulasKertasKerjaView'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

import styles from './index.module.css'

import clsx from 'clsx'

const MengulasKertasKerjaView: FC = () => {
  const navigate = useNavigate()

  const [isSync, setIsSync] = useState(false)
  const [openModalAjukan, setOpenModalAjukan] = useState(false)

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const handleAjukanPengesahan = () => {
    setOpenModalAjukan(false)
    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
    }, 3000)
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
            <Button
              color="blue"
              size="md"
              variant="solid"
              onClick={() => setOpenModalAjukan(true)}
            >
              Ajukan Pengesahan
            </Button>
          </div>
          <div className="w-full flex text-center justify-end font-normal text-tiny text-blue-700 pb-4">
            <b>“Ajukan Pengesahan”</b> membutuhkan koneksi internet
          </div>
        </span>
      </div>
      <div className="bg-white px-10 py-5 h-full">
        <div className="flex justify-between">
          <span>
            <DropdownComponent />
          </span>
          <AmountCardComponent
            type="disabled"
            width={320}
            label="Anggaran Tahap 1"
            amount={100000000}
          />
        </div>
        <div>
          <Tabs className="w-full">
            <div className="shadow pt-[14px]">
              <TabList style={{ marginLeft: 0 }}>
                <Tab className="capitalize-first">Periode Salur Tahap 1</Tab>
                <Tab className="capitalize-first">Periode Salur Tahap 2</Tab>
                <Tab className="capitalize-first">Periode Salur Tahap 3</Tab>
              </TabList>
            </div>
            <TabPanels>
              <TabPanel>
                <TabelMengulasKertasKerjaView />
              </TabPanel>
              <TabPanel>
                <div>test</div>
              </TabPanel>
              <TabPanel>
                <div>test</div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <AlertDialogComponent
        type="warning"
        icon="send"
        title="Ajukan pengesahan Kertas Kerja?"
        desc="Kertas Kerja Anda akan dikirim ke dinas setempat dan diperiksa kesesuaiannya dengan peraturan yang berlaku. Setelah pengajuan dikirim, Kertas Kerja tidak bisa diedit."
        isOpen={openModalAjukan}
        btnCancelText="Batal"
        btnActionText="Kirim Pengajuan"
        onCancel={() => setOpenModalAjukan(false)}
        onSubmit={handleAjukanPengesahan}
      />
      <SyncDialogComponent
        title="Mengirim Kertas Kerja..."
        subtitle="Pastikan Anda terkoneksi ke internet yang lancar."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
    </div>
  )
}

export default MengulasKertasKerjaView
