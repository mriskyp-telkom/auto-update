import React, { FC } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'

import CardDashboardTataUsahaView from './CardDashboardTataUsahaView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

import { BKUCardDashboardType } from 'renderer/types/TataUsahaType'

const bosReguler = [
  {
    tahun: 2022,
    status: 'not_active',
    show_bulan: true,
  },
  {
    tahun: 2021,
    status: 'done',
    show_bulan: true,
  },
  {
    tahun: 2020,
    status: 'done',
    show_bulan: false,
  },
]

const DashboardTataUsahaView: FC = () => {
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
            <TabPanel className="mt-6 mb-[2px] mr-3 grid justify-items-center max-h-[550px] scrollBar overflow-y-scroll">
              {bosReguler.map((item: BKUCardDashboardType, index: number) => {
                return <CardDashboardTataUsahaView key={index} data={item} />
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

export default DashboardTataUsahaView
