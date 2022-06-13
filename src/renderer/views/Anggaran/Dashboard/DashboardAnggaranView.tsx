import React, { FC, useEffect, useState } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'

import CardDashboardAnggaranView from './CardDashboardAnggaranView'

import { KKCardDashboardType } from 'renderer/types/AnggaranType'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'
import { ID_SUMBER_DANA } from 'renderer/constants/anggaran'
import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'
import { Link } from 'react-router-dom'
import { PAGE_PERBARUI_APLIKASI } from 'renderer/constants/routes'
import NotificationComponent from 'renderer/components/NotificationComponent'

const ipcRenderer = window.require('electron').ipcRenderer

const DashboardAnggaranView: FC = () => {
  const [bosReguler, setBosReguler] = useState([])
  const isFocused = useAnggaranStore((state: AnggaranStates) => state.isFocused)

  const setIsFocused = useAnggaranStore(
    (state: AnggaranStates) => state.setIsFocused
  )

  const fetchData = () => {
    const anggaranBOSReguler = ipcRenderer.sendSync(
      'anggaran:getAnggaran',
      ID_SUMBER_DANA.BOS_REGULER
    )
    setBosReguler(anggaranBOSReguler)
    setIsFocused(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (isFocused) {
      fetchData()
    }
  }, [isFocused])

  return (
    <PageLayout>
      <div className="flex flex-col w-[980px] mt-[45px] mx-auto">
        <NotificationComponent>
          Versi terbaru untuk ARKAS 4.1 sudah tersedia. Silahkan perbarui di
          sini{` `}
          <Link className="underline text-blue-600" to={PAGE_PERBARUI_APLIKASI}>
            Perbarui Arkas
          </Link>
        </NotificationComponent>
        <Tabs className="w-full bg-white rounded-[10px]">
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
              {bosReguler.map((item: KKCardDashboardType, index: number) => {
                return <CardDashboardAnggaranView key={index} data={item} />
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
