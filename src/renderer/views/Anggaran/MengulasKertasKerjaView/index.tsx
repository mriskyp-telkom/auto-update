import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import DropdownComponent from 'renderer/components/DropdownComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import ButtonCariComponent from 'renderer/components/ButtonCariComponent'

import TabelMengulasKertasKerjaView from './TabelMengulasKertasKerjaView'
import PanduanMengulasKKView from 'renderer/views/Anggaran/Panduan/PanduanMengulasKKView'
import PanduanCekStatusKKView from 'renderer/views/Anggaran/Panduan/PanduanCekStatusKKView'
import PanduanSuccessPengesahanKKView from 'renderer/views/Anggaran/Panduan/PanduanSuccessPengesahanKKView'

import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { STATUS_KERTAS_KERJA } from 'global/constants'
import {
  RESPONSE_PENGESAHAN,
  ALERT_MENGULAS,
  MODE_MENGULAS,
  LABEL_MODE_MENGULAS,
} from 'renderer/constants/anggaran'

import syncToIPCMain from 'renderer/configs/ipc'

import { AlertType } from 'renderer/types/ComponentType'
import { IPC_ANGGARAN } from 'global/ipc'

const MengulasKertasKerjaView: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { q_id_anggaran } = useParams()
  const idAnggaran = decodeURIComponent(q_id_anggaran)
  const [openModalAjukan, setOpenModalAjukan] = useState(false)
  const [modeMengulas, setModeMengulas] = useState(MODE_MENGULAS.tahap)
  const [tahap, setTahap] = useState(1)
  const [anggaran, setAnggaran] = useState(0)
  const [totalAnggaran, setTotalAnggaran] = useState(0)
  const [sisaDana, setSisaDana] = useState(0)
  const [tahun, setTahun] = useState(null)

  const isDisplayAmount = modeMengulas === MODE_MENGULAS.tahap

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
    navigate(`/sync/anggaran/mengulas/${q_id_anggaran}`, {
      state: { backgroundLocation: location },
    })
  }

  useEffect(() => {
    const pagu = syncToIPCMain(IPC_ANGGARAN.getPagu, idAnggaran)
    setSisaDana(pagu?.sisa)
    setTotalAnggaran(pagu?.total)
    setTahun(pagu.tahun_anggaran)
  }, [])

  useEffect(() => {
    if (modeMengulas != '') {
      if (modeMengulas === MODE_MENGULAS.tahap) {
        setTahap(1)
        const anggaran = syncToIPCMain(IPC_ANGGARAN.getTotalAnggaran, {
          id_tahap: 1,
          id_anggaran: idAnggaran,
        })
        setAnggaran(anggaran?.total ?? 0)
      }
    }
  }, [modeMengulas])

  const handleChangeTabs = (index: number) => {
    const selectedTahap = index + 1
    setTahap(selectedTahap)
    const anggaran = syncToIPCMain(IPC_ANGGARAN.getTotalAnggaran, {
      id_tahap: selectedTahap,
      id_anggaran: idAnggaran,
    })
    setAnggaran(anggaran?.total ?? 0)
  }

  const getPanduan = () => {
    const dataAnggaran = syncToIPCMain(IPC_ANGGARAN.getAnggaranById, idAnggaran)
    if (dataAnggaran.status === STATUS_KERTAS_KERJA.draft) {
      return <PanduanMengulasKKView />
    }
    if (dataAnggaran.status === STATUS_KERTAS_KERJA.waiting_approval) {
      return <PanduanCekStatusKKView />
    }
    if (dataAnggaran.status === STATUS_KERTAS_KERJA.approved) {
      return <PanduanSuccessPengesahanKKView />
    }
  }

  const handleChangeMode = (value: string) => {
    setModeMengulas(value)
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
            Mengulas RKAS
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[57px]"
            style={{ display: 'inline-block' }}
          >
            Bos reguler {tahun}
            <Tooltip
              content={`BOS reguler ${tahun}`}
              placement="top"
              strategy="fixed"
              trigger="hover"
            >
              <span className="hidden">BOS reguler {tahun}</span>
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
                amount={totalAnggaran}
              />
            </span>
            <span>
              <div className="font-normal text-tiny text-gray-900 pb-1">
                Sisa Dana
              </div>
              <AmountCardComponent
                type="disabled"
                width={210}
                amount={sisaDana}
              />
            </span>
          </div>
        </span>
        <span>
          {getPanduan()}
          <div className="flex justify-end pt-5 pb-3">
            <ButtonCariComponent />
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
            <DropdownComponent
              options={LABEL_MODE_MENGULAS}
              handleChange={handleChangeMode}
            />
          </span>
          {isDisplayAmount && (
            <AmountCardComponent
              type="disabled"
              width={320}
              label={`Anggaran Tahap ${tahap}`}
              amount={anggaran}
            />
          )}
        </div>
        <div id="tabelMengulas">
          {modeMengulas === MODE_MENGULAS.tahap && (
            <Tabs className="w-full" onChange={handleChangeTabs}>
              <div className="shadow pt-[14px]">
                <TabList style={{ marginLeft: 0 }}>
                  <Tab className="capitalize-first">Periode Salur Tahap 1</Tab>
                  <Tab className="capitalize-first">Periode Salur Tahap 2</Tab>
                  <Tab className="capitalize-first">Periode Salur Tahap 3</Tab>
                </TabList>
              </div>
              <TabPanels>
                <TabPanel className="pt-8">
                  <TabelMengulasKertasKerjaView
                    mode={modeMengulas}
                    tahap={1}
                    idAnggaran={idAnggaran}
                  />
                </TabPanel>
                <TabPanel className="pt-8">
                  <TabelMengulasKertasKerjaView
                    mode={modeMengulas}
                    tahap={2}
                    idAnggaran={idAnggaran}
                  />
                </TabPanel>
                <TabPanel className="pt-8">
                  <TabelMengulasKertasKerjaView
                    mode={modeMengulas}
                    tahap={3}
                    idAnggaran={idAnggaran}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
          {modeMengulas === MODE_MENGULAS.tahun && (
            <div className="pt-8">
              <TabelMengulasKertasKerjaView
                mode={modeMengulas}
                idAnggaran={idAnggaran}
                tahap={0}
              />
            </div>
          )}
        </div>
      </div>
      <AlertDialogComponent
        type="warning"
        icon="send"
        title="Ajukan pengesahan RKAS?"
        desc="RKAS Anda akan dikirim ke dinas setempat dan diperiksa kesesuaiannya dengan peraturan yang berlaku. Setelah pengajuan dikirim, RKAS tidak bisa diedit."
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
