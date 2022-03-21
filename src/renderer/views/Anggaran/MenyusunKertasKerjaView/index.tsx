import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import FormKertasKerjaView from 'renderer/views/Anggaran/CreateKertasKerjaView/FormPenanggungJawabView'
import PanduanMenyusunKKView from 'renderer/views/Anggaran/Panduan/PanduanMenyusunKKView'
import PanduanErrorDataSentralKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorDataSentralKKView'
import PanduanErrorSisaDanaKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorSisaDanaKKView'

import TabelMenyusunKertasKerjaView from './TabelMenyusunKertasKerjaView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { DATA_BULAN } from 'renderer/constants/general'
import {
  RESPONSE_PENGESAHAN,
  ALERT_MENGULAS,
} from 'renderer/constants/anggaran'

import { AlertType } from 'renderer/types/ComponentType'
import { APP_CONFIG } from '../../../constants/appConfig'
const ipcRenderer = window.require('electron').ipcRenderer

const MenyusunKertasKerjaView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode } = useParams()

  const [isSync, setIsSync] = useState(false)
  const [openModalInit, setOpenModalInit] = useState(false)
  const [jumlahPagu, setJumlahPagu] = useState(0)
  const [total, setTotal] = useState(0)
  const [sisa, setSisa] = useState(0)

  const [tahunAktif, setTahunAktif] = useState('')

  const alertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.alertMengulas
  )

  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )

  const responseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.responseMengulas
  )

  const setCreateKertasKerja = useAnggaranStore(
    (state: AnggaranStates) => state.setCreateKertasKerja
  )

  const penanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.penanggungJawab
  )

  const pagu = useAnggaranStore((state: AnggaranStates) => state.pagu)

  const handleSalinKertasKerja = () => {
    setOpenModalInit(false)
    setIsSync(true)
    setTimeout(() => {
      setIsSync(false)
    }, 3000)
  }

  const handleBuatBaru = () => {
    setOpenModalInit(false)
    setIsSync(true)
    const penggunaId = ipcRenderer.sendSync('user:getPenggunaId')
    const penjab = {
      sekolah_id: penanggungJawab.sekolah_id,
      kepsek: penanggungJawab.kepsek,
      nip_kepsek: penanggungJawab.nip_kepsek,
      email_kepsek: penanggungJawab.email_kepsek,
      telepon_kepsek: penanggungJawab.telepon_kepsek,
      bendahara: penanggungJawab.bendahara,
      nip_bendahara: penanggungJawab.nip_bendahara,
      email_bendahara: penanggungJawab.email_bendahara,
      telepon_bendahara: penanggungJawab.telepon_bendahara,
      komite: penanggungJawab.komite,
      nip_komite: penanggungJawab.nip_komite,
      updater_id: penggunaId,
      create_date: new Date(),
    }
    const penjabId = ipcRenderer.sendSync('penjab:addPenjab', penjab)
    const dataAnggaran = {
      id_ref_sumber_dana: pagu.sumber_dana_id,
      volume: pagu.volume,
      harga_satuan: pagu.harga_satuan,
      pengguna_id: penggunaId,
      id_penjab: penjabId,
      tahun: tahunAktif,
      create_date: new Date(),
    }
    const idAnggaran = ipcRenderer.sendSync(
      'anggaran:addAnggaran',
      dataAnggaran
    )
    const getPagu = ipcRenderer.sendSync('anggaran:getPagu', idAnggaran)
    setJumlahPagu(getPagu.pagu)
    setTotal(getPagu.total)
    setSisa(getPagu.sisa)
    setIsSync(false)
  }

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const getPanduan = () => {
    if (responseMengulas === null) {
      return <PanduanMenyusunKKView />
    }
    if (responseMengulas === RESPONSE_PENGESAHAN.error_sisa_dana) {
      return <PanduanErrorSisaDanaKKView />
    }
    if (responseMengulas === RESPONSE_PENGESAHAN.error_data_sentral) {
      return <PanduanErrorDataSentralKKView />
    }
  }

  useEffect(() => {
    const tahunAktif = ipcRenderer.sendSync(
      'config:getConfig',
      APP_CONFIG.tahunAktif
    )
    setTahunAktif(tahunAktif)
  }, [])

  useEffect(() => {
    if (tahunAktif !== '') {
      if (mode === 'create') {
        const data = {
          sumber_dana: pagu.sumber_dana_id,
          tahun: tahunAktif,
        }
        const tahunAnggaranBefore = ipcRenderer.sendSync(
          'anggaran:checkBefore',
          data
        )
        if (tahunAnggaranBefore !== '') {
          setOpenModalInit(true)
        } else {
          handleBuatBaru()
        }
      }
    }
  }, [tahunAktif])

  return (
    <div>
      <div className="flex justify-between pt-10 pb-5 px-10 bg-gray-0">
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
            Menyusun Kertas Kerja
            <Icon
              as="button"
              color="default"
              fontSize="default"
              className="ml-[10px]"
              style={{ color: '#054BCC' }}
              onClick={() => setCreateKertasKerja(true)}
            >
              edit
            </Icon>
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[88px]"
            style={{ display: 'inline-block' }}
          >
            Bos reguler 2021
            <Tooltip
              content="BOS reguler 2021"
              placement="top"
              strategy="fixed"
              trigger="hover"
            >
              <span className="hidden">BOS reguler {tahunAktif}</span>
            </Tooltip>
          </div>
          <AmountCardComponent
            type="disabled"
            width={377}
            label="Total Penerimaan BOS Reguler"
            amount={jumlahPagu}
          />
        </span>
        <span>
          {getPanduan()}
          <div className="flex justify-end pt-5 pb-1">
            <Link
              to="/form/kertas-kerja/create"
              state={{ backgroundLocation: location }}
            >
              <Button color="white" size="md" variant="solid" className="mr-3">
                <Icon as="i" color="default" fontSize="default">
                  add
                </Icon>
                Tambah Kegiatan
              </Button>
            </Link>
            <Link to="/anggaran/mengulas">
              <Button
                color="black"
                size="md"
                variant="solid"
                disabled={responseMengulas !== null}
              >
                Selesai
              </Button>
            </Link>
          </div>
        </span>
      </div>
      <div className="bg-white px-10 h-full">
        <div className="flex justify-between">
          <span className="font-semibold text-[28px] pt-6 pb-[60px]">
            Periode Anggaran {tahunAktif}
          </span>
          <span className="pt-4 pb-3">
            <div className="w-full flex text-center justify-end font-normal text-tiny text-blue-700 pb-[28px]">
              <Icon
                as="i"
                color="default"
                fontSize="default"
                className="ml-[6px]"
                style={{ fontSize: '18px', color: '#0B5FEF' }}
              >
                done
              </Icon>
              Tersimpan otomatis pukul 13:00
            </div>
            <div className="flex">
              <AmountCardComponent
                type="default"
                width={287}
                label="Total Anggaran"
                amount={total}
                class="mr-3"
              />
              <AmountCardComponent
                type={
                  responseMengulas === RESPONSE_PENGESAHAN.error_sisa_dana
                    ? 'warning'
                    : 'default'
                }
                width={287}
                label="Sisa Dana"
                amount={sisa}
              />
            </div>
          </span>
        </div>
        <Tabs className="w-full">
          <div className="shadow pt-[14px]">
            <TabList style={{ marginLeft: 0 }}>
              {DATA_BULAN.map((bulan) => (
                <Tab key={bulan} className="capitalize-first">
                  {bulan}
                </Tab>
              ))}
            </TabList>
          </div>
          <TabPanels>
            {DATA_BULAN.map((bulan) => (
              <TabPanel key={bulan}>
                <TabelMenyusunKertasKerjaView bulan={bulan} />
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>
      <AlertDialogComponent
        type="warning"
        icon="file_copy"
        title="Salin dari Kertas Kerja sebelumnya?"
        desc="Anda dapat menyalin isi Kertas Kerja pada tahun anggaran sebelumnya ke lembar ini atau membuat Kertas Kerja baru."
        isOpen={openModalInit}
        btnCancelText="Buat Baru"
        btnActionText="Salin Kertas Kerja"
        onCancel={handleBuatBaru}
        onSubmit={handleSalinKertasKerja}
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
      <SyncDialogComponent
        title="Menyalin Kertas Kerja..."
        subtitle="Mohon tunggu sebentar."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <FormKertasKerjaView mode="update" />
    </div>
  )
}

export default MenyusunKertasKerjaView
