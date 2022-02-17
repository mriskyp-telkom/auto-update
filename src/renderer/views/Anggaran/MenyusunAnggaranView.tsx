import React, { FC } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'
import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

const MenyusunAnggaranView: FC = () => {
  return (
    <PageLayout>
      <div className="flex justify-between pt-10 px-10">
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
              as="i"
              color="default"
              fontSize="default"
              className="ml-[10px]"
              style={{ color: '#054BCC' }}
            >
              edit
            </Icon>
          </div>
          <div className="text-[14px] font-semibold text-gray-600 mb-[88px]">
            BOS reguler 2021
          </div>
          <AmountCardComponent
            type="disabled"
            width={377}
            label="Total Penerimaan BOS Reguler"
            amount={300000000}
          />
        </span>
        <span>
          <div className="bg-gray-300 rounded p-6">
            <div>
              <Icon
                as="i"
                color="default"
                fontSize="small"
                style={{ fontSize: '14px' }}
                className="ml-1"
              >
                info
              </Icon>
              Panduan
            </div>
            <ul className="list font-normal text-[14px] text-gray-900">
              <li>
                Anda harus menghabiskan seluruh anggaran untuk bisa mengajukan
                pengesahan.
              </li>
              <li>
                Pastikan Anda membuat anggaran berdasarkan juknis yang berlaku.{' '}
                <a>Lihat Juknis</a>
              </li>
              <li>
                Dalam membuat rencana anggaran sebaiknya juga memperhatikan
                prioritas kegiatan daerah. <a>Lihat Prioritas Daerah</a>
              </li>
            </ul>
          </div>
          <div className="flex justify-end pt-5 pb-6">
            <Button color="white" size="md" variant="solid" className="mr-3">
              <Icon as="i" color="default" fontSize="default">
                add
              </Icon>
              Tambah Kegiatan
            </Button>
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
          <div
            className="pt-[14px]"
            style={{ boxShadow: 'inset 0px -1px 0px #C9CBCF' }}
          >
            <TabList style={{ marginLeft: 0 }}>
              <Tab>Januari</Tab>
              <Tab>Februari</Tab>
              <Tab>Maret</Tab>
              <Tab>April</Tab>
              <Tab>Mei</Tab>
              <Tab>Juni</Tab>
              <Tab>Juli</Tab>
              <Tab>Agustus</Tab>
              <Tab>September</Tab>
              <Tab>Oktober</Tab>
              <Tab>November</Tab>
              <Tab>Desember</Tab>
            </TabList>
          </div>
          <TabPanels>
            <TabPanel className="mt-6 mb-[2px] grid justify-items-center">
              Januari
            </TabPanel>
            <TabPanel>Februari</TabPanel>
            <TabPanel>Maret</TabPanel>
            <TabPanel>April</TabPanel>
            <TabPanel>Mei</TabPanel>
            <TabPanel>Juni</TabPanel>
            <TabPanel>Juli</TabPanel>
            <TabPanel>Agustus</TabPanel>
            <TabPanel>September</TabPanel>
            <TabPanel>Oktober</TabPanel>
            <TabPanel>November</TabPanel>
            <TabPanel>Desember</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </PageLayout>
  )
}

export default MenyusunAnggaranView
