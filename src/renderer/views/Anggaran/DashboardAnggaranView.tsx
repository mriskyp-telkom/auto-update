import React, { FC } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'

import CardDashboardAnggaranView from './CardDashboardAnggaranView'

import { CardDashboardType } from 'renderer/types/AnggaranType'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

const BosReguler = [
  {
    id_anggaran: 1,
    tahun: '2022',
    status: 'waiting_approval',
    tenggat_waktu: '2020-12-30',
    status_updated_at: null,
    type: null,
    tanggal_pengesahan: null,
  },
  {
    id_anggaran: 2,
    tahun: '2021',
    status: 'approved',
    tenggat_waktu: '2020-12-30',
    status_updated_at: '2022-12-30 17:00',
    type: 'pergeseran',
    tanggal_pengesahan: '2022-12-30 17:00',
  },
  {
    id_anggaran: 3,
    tahun: '2020',
    status: 'approved',
    tenggat_waktu: '2020-12-30',
    status_updated_at: '2022-12-30 17:00',
    type: null,
    tanggal_pengesahan: null,
  },
]

const DashboardAnggaranView: FC = () => {
  return (
    <PageLayout>
      <div className="flex w-[980px] bg-white rounded-[10px] mt-[45px] mx-auto">
        <Tabs className="w-full">
          <div className="shadow pt-[14px]">
            <TabList style={{ marginLeft: 0 }}>
              <Tab>BOS Reguler</Tab>
              <Tab>BOS Daerah</Tab>
              <Tab>BOS Afirmasi/Kinerja</Tab>
              <Tab>SILPA BOS Reguler</Tab>
              <Tab>SILPA BOS Afirmasi/Kinerja</Tab>
              <Tab>Lainnya</Tab>
            </TabList>
          </div>
          <TabPanels>
            <TabPanel className="mt-6 mb-[2px] grid justify-items-center">
              {BosReguler.map((item: CardDashboardType) => {
                return <CardDashboardAnggaranView data={item} />
              })}
            </TabPanel>
            <TabPanel>Guru Mengajar adalah ...</TabPanel>
            <TabPanel>Guru Portfolio adalah ...</TabPanel>
            <TabPanel>Kampus Merdeka adalah ...</TabPanel>
            <TabPanel>Guru Mengajar adalah ...</TabPanel>
            <TabPanel>Guru Portfolio adalah ...</TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </PageLayout>
  )
}

export default DashboardAnggaranView
