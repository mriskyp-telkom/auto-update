import React, { FC, useEffect, useState } from 'react'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import FormKertasKerjaView from 'renderer/views/Anggaran/CreateKertasKerjaView/FormPenanggungJawabView'

import FormIsiDetailKertasKerjaView from './FormIsiDetailKertasKerjaView'
import TabelKertasKerjaView from './TabelKertasKerjaView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { DATA_BULAN } from 'renderer/constants/general'

import styles from './index.module.css'

import clsx from 'clsx'

const MenyusunKertasKerjaView: FC = () => {
  const [isSync, setIsSync] = useState(false)
  const [openModalInit, setOpenModalInit] = useState(false)

  const setCreateKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setCreateKertasKerja
  )

  const handleSalinKertasKerja = () => {
    setOpenModalInit(false)
    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
    }, 3000)
  }

  useEffect(() => {
    setOpenModalInit(true)
  }, [])

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
            >
              keyboard_backspace
            </Icon>
            Kembali ke Beranda
          </div>
          <div className="flex items-center text-[22px] font-semibold">
            Menyusun Kertas Kerja
            <Icon
              as="button"
              color="default"
              fontSize="default"
              className="ml-[10px]"
              style={{ color: '#054BCC' }}
              onClick={() => setCreateKertasKerja(true)}
            >
              edit
            </Icon>
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[88px]"
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
          <AmountCardComponent
            type="disabled"
            width={377}
            label="Total Penerimaan BOS Reguler"
            amount={300000000}
          />
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
                  Anda harus menghabiskan seluruh anggaran untuk bisa mengajukan
                  pengesahan.
                </span>
              </li>
              <li>
                <span>
                  Pastikan Anda membuat anggaran berdasarkan juknis yang
                  berlaku.
                  <a>Lihat Juknis</a>
                </span>
              </li>
              <li>
                <span>
                  Dalam membuat rencana anggaran sebaiknya juga memperhatikan
                  prioritas kegiatan daerah. <a>Lihat Prioritas Daerah</a>
                </span>
              </li>
            </ul>
          </div>
          <div className="flex justify-end pt-5 pb-6">
            <FormIsiDetailKertasKerjaView />
            <Button color="black" size="md" variant="solid">
              Selesai
            </Button>
          </div>
        </span>
      </div>
      <div className="bg-white px-10 h-full">
        <div className="flex justify-between">
          <span className="font-semibold text-[28px] pt-6 pb-[60px]">
            Periode Anggaran 2021
          </span>
          <span className="pt-4 pb-3">
            <div className="w-full flex text-center justify-end font-normal text-[12px] text-blue-700 pb-[28px]">
              <Icon
                as="i"
                color="default"
                fontSize="default"
                className="ml-[6px]"
                style={{ fontSize: '18px', color: '#0B5FEF' }}
              >
                done
              </Icon>
              Tersimpan otomatis pukul 13:00
            </div>
            <div className="flex">
              <AmountCardComponent
                type="default"
                width={287}
                label="Total Anggaran"
                amount={0}
                class="mr-3"
              />
              <AmountCardComponent
                type="default"
                width={287}
                label="Sisa Dana"
                amount={300000000}
              />
            </div>
          </span>
        </div>
        <Tabs className="w-full">
          <div className="shadow pt-[14px]">
            <TabList style={{ marginLeft: 0 }}>
              {DATA_BULAN.map((bulan) => (
                <Tab key={bulan} className="capitalize-first">
                  {bulan}
                </Tab>
              ))}
            </TabList>
          </div>
          <TabPanels>
            {DATA_BULAN.map((bulan) => (
              <TabPanel key={bulan}>
                <TabelKertasKerjaView bulan={bulan} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
      <AlertDialogComponent
        type="warning"
        icon="file_copy"
        title="Salin dari Kertas Kerja sebelumnya? "
        desc="Anda dapat menyalin isi Kertas Kerja pada tahun anggaran sebelumnya ke lembar ini atau membuat Kertas Kerja baru."
        isOpen={openModalInit}
        btnCancelText="Buat Baru"
        btnActionText="Salin Kertas Kerja"
        onCancel={() => setOpenModalInit(false)}
        onSubmit={handleSalinKertasKerja}
      />
      <SyncDialogComponent
        title="Menyalin Kertas Kerja..."
        subtitle="Mohon tunggu sebentar."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <FormKertasKerjaView mode="update" />
    </div>
  )
}

export default MenyusunKertasKerjaView
