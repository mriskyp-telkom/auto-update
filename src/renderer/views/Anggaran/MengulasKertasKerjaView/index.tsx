import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

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
import { formatDateToString } from 'renderer/utils/date-formatting'

import { copyKertasKerja } from 'renderer/utils/copy-writing'
import AlertNoConnection from 'renderer/views/AlertNoConnection'
import { AppStates, useAppStore } from 'renderer/stores/app'

const MengulasKertasKerjaView: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const { q_id_anggaran } = useParams()
  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const [openModalAjukan, setOpenModalAjukan] = useState(false)
  const [modeMengulas, setModeMengulas] = useState(MODE_MENGULAS.tahap)
  const [tahap, setTahap] = useState(1)
  const [anggaran, setAnggaran] = useState(0)
  const [detailAnggaran, setDetailAnggaran] = useState(null)
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

  const setCounterRetryPengajuan = useAnggaranStore(
    (state: AnggaranStates) => state.setCounterRetryPengajuan
  )

  const setAlertNoConnection = useAppStore(
    (state: AppStates) => state.setAlertNoConnection
  )

  const isFocused = useAnggaranStore((state: AnggaranStates) => state.isFocused)

  const setIsFocused = useAnggaranStore(
    (state: AnggaranStates) => state.setIsFocused
  )

  const isHideBtnCancel =
    responseMengulas !== RESPONSE_PENGESAHAN.success &&
    responseMengulas !== RESPONSE_PENGESAHAN.error_sync_status &&
    responseMengulas !== RESPONSE_PENGESAHAN.error_multiple_device

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const handleBtnEdit = () => {
    navigate(`/anggaran/menyusun/update/${encodeURIComponent(q_id_anggaran)}`)
  }

  const handleAjukanPengesahan = () => {
    setOpenModalAjukan(false)
    navigate(`/sync/anggaran/mengulas/${encodeURIComponent(q_id_anggaran)}`, {
      state: { backgroundLocation: location },
    })
  }

  const handleChangeTabs = (index: number) => {
    const selectedTahap = index + 1
    setTahap(selectedTahap)
    const anggaran = syncToIPCMain(IPC_ANGGARAN.getTotalAnggaran, {
      id_tahap: selectedTahap,
      id_anggaran: idAnggaran,
    })
    setAnggaran(anggaran?.total ?? 0)
  }

  const handlePengesahan = () => {
    setAlertNoConnection(false)
    setTimeout(() => {
      if (!navigator.onLine) {
        setAlertNoConnection(true)
      } else {
        setOpenModalAjukan(true)
      }
    }, 300)
  }

  const getPanduan = () => {
    if (
      detailAnggaran?.status === STATUS_KERTAS_KERJA.draft ||
      detailAnggaran?.status === STATUS_KERTAS_KERJA.not_approved
    ) {
      return <PanduanMengulasKKView />
    }
    if (detailAnggaran?.status === STATUS_KERTAS_KERJA.waiting_approval) {
      return (
        <PanduanCekStatusKKView
          tanggalPengajuan={formatDateToString(
            detailAnggaran?.tanggalPengajuan,
            'DD/MM/YYYY'
          )}
          idAnggaran={idAnggaran}
        />
      )
    }
    if (detailAnggaran?.status === STATUS_KERTAS_KERJA.approved) {
      return <PanduanSuccessPengesahanKKView />
    }
  }

  const showButtonEdit = () => {
    if (detailAnggaran?.status === STATUS_KERTAS_KERJA.draft) {
      return true
    }
    if (detailAnggaran?.status === STATUS_KERTAS_KERJA.not_approved) {
      return true
    }
    return false
  }

  const handleChangeMode = (value: string) => {
    setModeMengulas(value)
  }

  const handleSubmit = () => {
    setAlertMengulas(false)
    if (responseMengulas === RESPONSE_PENGESAHAN.success) {
      navigate('/anggaran')
    }
    if (
      responseMengulas === RESPONSE_PENGESAHAN.error_sync_status ||
      responseMengulas === RESPONSE_PENGESAHAN.error_lost_connection
    ) {
      setOpenModalAjukan(false)
      if (!navigator.onLine) {
        setAlertNoConnection(true)
      } else {
        navigate(
          `/sync/anggaran/mengulas/${encodeURIComponent(q_id_anggaran)}`,
          {
            state: { backgroundLocation: location },
          }
        )
      }
    }
    if (responseMengulas === RESPONSE_PENGESAHAN.error_multiple_device) {
      navigate('/registration')
    }
  }

  const handleTutupModal = () => {
    setCounterRetryPengajuan(0)
    setAlertMengulas(false)
    setIsFocused(true)
  }

  const fetchData = () => {
    const pagu = syncToIPCMain(IPC_ANGGARAN.getPagu, idAnggaran)
    const dataAnggaran = syncToIPCMain(IPC_ANGGARAN.getAnggaranById, idAnggaran)
    setSisaDana(pagu?.sisa)
    setTotalAnggaran(pagu?.total)
    setTahun(pagu.tahun_anggaran)
    setDetailAnggaran(dataAnggaran)
    setIsFocused(false)
  }

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

  useEffect(() => {
    if (isFocused) {
      fetchData()
    }
  }, [isFocused])

  useEffect(() => {
    fetchData()
  }, [])

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
            Mengulas {copyKertasKerja('draft')}
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[57px]"
            style={{ display: 'inline-block' }}
          >
            Bos reguler {tahun}
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
            {showButtonEdit() && (
              <Button
                color="white"
                size="md"
                variant="solid"
                className="mr-3"
                onClick={handleBtnEdit}
              >
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
            {showButtonEdit() && (
              <Button
                color="blue"
                size="md"
                variant="solid"
                onClick={handlePengesahan}
              >
                Ajukan Pengesahan
              </Button>
            )}
          </div>
          {showButtonEdit() && (
            <div className="w-full flex text-center justify-end font-normal text-tiny text-blue-700 pb-4">
              <b>???Ajukan Pengesahan???</b> membutuhkan koneksi internet
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
        title={`Ajukan pengesahan ${copyKertasKerja()}?`}
        desc={`${copyKertasKerja()} Anda akan dikirim ke dinas setempat dan diperiksa kesesuaiannya dengan peraturan yang berlaku. Setelah pengajuan dikirim, ${copyKertasKerja()} tidak bisa diedit.`}
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
          hideBtnCancel={isHideBtnCancel}
          btnCancelText={ALERT_MENGULAS[responseMengulas].btnCancelText}
          btnActionText={ALERT_MENGULAS[responseMengulas].btnActionText}
          onCancel={handleTutupModal}
          onSubmit={handleSubmit}
        />
      )}
      <AlertNoConnection
        onSubmit={handlePengesahan}
        onCancel={() => setAlertNoConnection(false)}
      />
    </div>
  )
}

export default MengulasKertasKerjaView
