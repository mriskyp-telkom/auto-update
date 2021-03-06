import React, { FC, useEffect, useState } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'

import CardDashboardTataUsahaView from './CardDashboardTataUsahaView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

import { BKUCardDashboardTahunType } from 'renderer/types/TataUsahaType'

import { ID_SUMBER_DANA } from 'renderer/constants/anggaran'
import { APP_CONFIG } from 'renderer/constants/appConfig'

import { TataUsahaStates, useTataUsahaStore } from 'renderer/stores/tata-usaha'

import syncToIpcMain from 'renderer/configs/ipc'

import { IPC_TATA_USAHA, IPC_CONFIG } from 'global/ipc'

const DashboardTataUsahaView: FC = () => {
  const [tahunAktif, setTahunAktif] = useState('')
  const [bosReguler, setBosReguler] = useState([])

  const isFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.isFocused
  )

  const setIsFocused = useTataUsahaStore(
    (state: TataUsahaStates) => state.setIsFocused
  )

  const fetchData = () => {
    const bkuBOSReguler = syncToIpcMain(
      IPC_TATA_USAHA.getListAnggaran,
      ID_SUMBER_DANA.BOS_REGULER
    )
    if (bkuBOSReguler?.error) {
      //an error occured when fetch data from local database
    } else {
      setBosReguler(bkuBOSReguler?.value)
    }

    const tahunAktif = syncToIpcMain(
      IPC_CONFIG.getConfig,
      APP_CONFIG.tahunAktif
    )
    setTahunAktif(tahunAktif)
  }

  useEffect(() => {
    if (isFocused) {
      fetchData()
      setIsFocused(false)
    }
  }, [isFocused])

  useEffect(() => {
    fetchData()
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
            <TabPanel className="mt-6 mb-[2px] mr-3 grid justify-items-center max-h-[550px] scrollBar overflow-y-scroll">
              {bosReguler?.map(
                (item: BKUCardDashboardTahunType, index: number) => {
                  return (
                    <CardDashboardTataUsahaView
                      key={index}
                      data={item}
                      sumberDana={ID_SUMBER_DANA.BOS_REGULER}
                      tahunAktif={parseInt(tahunAktif)}
                    />
                  )
                }
              )}
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
