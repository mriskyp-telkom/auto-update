import React, { FC, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import DropdownComponent from 'renderer/components/DropdownComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'

import TabelMengulasKertasKerjaView from './TabelMengulasKertasKerjaView'
import PanduanMengulasKKView from 'renderer/views/Anggaran/Panduan/PanduanMengulasKKView'
import PanduanCekStatusKKView from 'renderer/views/Anggaran/Panduan/PanduanCekStatusKKView'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import {
  RESPONSE_PENGESAHAN,
  ALERT_MENGULAS,
} from 'renderer/constants/anggaran'

import { AlertType } from 'renderer/types/ComponentType'

const MengulasKertasKerjaView: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [openModalAjukan, setOpenModalAjukan] = useState(false)

  const alertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.alertMengulas
  )

  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )

  const responseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.responseMengulas
  )

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const handleAjukanPengesahan = () => {
    setOpenModalAjukan(false)
    navigate('/sync/anggaran/mengulas', {
      state: { backgroundLocation: location },
    })
  }

  const getPanduan = () => {
    if (responseMengulas === null) {
      return <PanduanMengulasKKView />
    }
    if (responseMengulas === RESPONSE_PENGESAHAN.success) {
      return <PanduanCekStatusKKView />
    }
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
          {getPanduan()}
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
            {responseMengulas === null && (
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
            )}
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
            {responseMengulas === null && (
              <Button
                color="blue"
                size="md"
                variant="solid"
                onClick={() => setOpenModalAjukan(true)}
              >
                Ajukan Pengesahan
              </Button>
            )}
          </div>
          {responseMengulas === null && (
            <div className="w-full flex text-center justify-end font-normal text-tiny text-blue-700 pb-4">
              <b>“Ajukan Pengesahan”</b> membutuhkan koneksi internet
            </div>
          )}
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
      {responseMengulas !== null && (
        <AlertDialogComponent
          type={ALERT_MENGULAS[responseMengulas].type as AlertType}
          icon={ALERT_MENGULAS[responseMengulas].icon}
          title={ALERT_MENGULAS[responseMengulas].title}
          desc={ALERT_MENGULAS[responseMengulas].desc}
          isOpen={alertMengulas}
          hideBtnCancel={responseMengulas !== RESPONSE_PENGESAHAN.success}
          btnCancelText={ALERT_MENGULAS[responseMengulas].btnCancelText}
          btnActionText={ALERT_MENGULAS[responseMengulas].btnActionText}
          onCancel={() => setAlertMengulas(false)}
          onSubmit={() => setAlertMengulas(false)}
        />
      )}
    </div>
  )
}

export default MengulasKertasKerjaView
