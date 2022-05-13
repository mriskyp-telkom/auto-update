import React, { FC, useEffect, useState } from 'react'

import PageLayout from 'renderer/views/Layout/PageLayout'

import CardDashboardTataUsahaView from './CardDashboardTataUsahaView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

import { BKUCardDashboardTahunType } from 'renderer/types/TataUsahaType'
import { ID_SUMBER_DANA } from 'renderer/constants/anggaran'
import syncToIpcMain from 'renderer/configs/ipc'

import { IPC_TATA_USAHA } from 'global/ipc'

const DashboardTataUsahaView: FC = () => {
  const [bosReguler, setBosReguler] = useState([])

  useEffect(() => {
    const bkuBOSReguler = syncToIpcMain(
      IPC_TATA_USAHA.getListAnggaran,
      ID_SUMBER_DANA.BOS_REGULER
    )
    if (bkuBOSReguler?.error) {
      //an error occured when fetch data from local database
    } else {
      setBosReguler(bkuBOSReguler?.value)
    }
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
