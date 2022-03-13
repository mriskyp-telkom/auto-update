import React, { FC, useEffect, useState } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'

import CardDashboardAnggaranView from './CardDashboardAnggaranView'

import { CardDashboardType } from 'renderer/types/AnggaranType'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

const ipcRenderer = window.require('electron').ipcRenderer

const DashboardAnggaranView: FC = () => {
  const [bosReguler, setBosReguler] = useState([])
  useEffect(() => {
    const anggaranBOSReguler = ipcRenderer.sendSync('anggaran:getAnggaran', 1)
    setBosReguler(anggaranBOSReguler)
  }, [])

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
              {bosReguler.map((item: CardDashboardType) => {
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
