import React, { FC } from 'react'

import PageLayout from 'views/Layout/PageLayout'

import CardDashboardAnggaranView from './CardDashboardAnggaranView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

interface CardDashboardType {
  tahun: string
  status: string
}

const BosReguler = [
  {
    tahun: '2022',
    status: 'not_created',
  },
  {
    tahun: '2021',
    status: 'approved',
  },
  {
    tahun: '2020',
    status: 'approved',
  },
]

const DashboardAnggaranView: FC = () => {
  return (
    <PageLayout>
      <div className="flex justify-center w-[980px] bg-white rounded-[10px] mt-[45px] mx-auto">
        <Tabs>
          <TabList>
            <Tab>BOS Reguler</Tab>
            <Tab>BOS Daerah</Tab>
            <Tab>BOS Afirmasi/Kinerja</Tab>
            <Tab>SILPA BOS Reguler</Tab>
            <Tab>SILPA BOS Afirmasi/Kinerja</Tab>
            <Tab>Lainnya</Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="my-5">
              {BosReguler.map((data: CardDashboardType) => {
                return (
                  <CardDashboardAnggaranView
                    key={data.tahun}
                    title={`Kertas Kerja BOS Reguler ${data.tahun}`}
                    status={data.status}
                  />
                )
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
