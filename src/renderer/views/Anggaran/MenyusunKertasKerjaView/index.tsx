import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import { Tooltip } from '@wartek-id/tooltip'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import FormPenanggungJawabView from 'renderer/views/Anggaran/CreateKertasKerjaView/FormPenanggungJawabView'
import PanduanMenyusunKKView from 'renderer/views/Anggaran/Panduan/PanduanMenyusunKKView'
import PanduanErrorDataSentralKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorDataSentralKKView'
import PanduanErrorSisaDanaKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorSisaDanaKKView'

import TabelMenyusunKertasKerjaView from './TabelMenyusunKertasKerjaView'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { IPC_ANGGARAN, IPC_PENJAB } from 'global/ipc'
import { DATA_BULAN } from 'renderer/constants/general'
import {
  RESPONSE_PENGESAHAN,
  ALERT_MENGULAS,
  MODE_CREATE_KERTAS_KERJA,
} from 'renderer/constants/anggaran'
import { APP_CONFIG } from 'renderer/constants/appConfig'

import { AlertType } from 'renderer/types/ComponentType'

import { encode } from 'uuid-base64-ts'

const ipcRenderer = window.require('electron').ipcRenderer

const MenyusunKertasKerjaView: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { q_mode, q_id_anggaran } = useParams()

  const [isSync, setIsSync] = useState(false)
  const [openModalInit, setOpenModalInit] = useState(false)
  const [jumlahPagu, setJumlahPagu] = useState(0)
  const [total, setTotal] = useState(0)
  const [sisa, setSisa] = useState(0)

  const [tahunAktif, setTahunAktif] = useState('')
  const [idAnggaranBefore, setIdAnggaranBefore] = useState(null)
  const [penggunaId, setPenggunaId] = useState('')
  const [idAnggaranBaru, setIdAnggaranBaru] = useState(null)

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

  const setPenanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.setPenanggungJawab
  )

  const pagu = useAnggaranStore((state: AnggaranStates) => state.pagu)

  const savePenjab = () => {
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
    return ipcRenderer.sendSync('penjab:addPenjab', penjab)
  }

  const setPagu = (idAnggaran: string) => {
    const getPagu = ipcRenderer.sendSync('anggaran:getPagu', idAnggaran)
    setJumlahPagu(getPagu.pagu)
    setTotal(getPagu.total)
    setSisa(getPagu.sisa)
  }

  const handleCreateKertasKerja = (mode: string) => {
    setOpenModalInit(false)
    setIsSync(true)

    const penjabId = savePenjab()
    const penjab = {
      ...penanggungJawab,
      id_penjab: penjabId,
    }
    setPenanggungJawab(penjab)

    let idAnggaran = ''
    let dataAnggaran: any = {
      id_ref_sumber_dana: pagu?.sumber_dana_id,
      volume: pagu.volume,
      harga_satuan: pagu.harga_satuan,
      pengguna_id: penggunaId,
      id_penjab: penjabId,
      tahun: tahunAktif,
    }

    if (mode === MODE_CREATE_KERTAS_KERJA.new) {
      dataAnggaran = {
        ...dataAnggaran,
        create_date: new Date(),
      }
      console.log(dataAnggaran)
      idAnggaran = ipcRenderer.sendSync('anggaran:addAnggaran', dataAnggaran)
    }

    if (mode === MODE_CREATE_KERTAS_KERJA.salin) {
      dataAnggaran = {
        ...dataAnggaran,
        id_anggaran_before: idAnggaranBefore,
      }
      idAnggaran = ipcRenderer.sendSync('anggaran:copyAnggaran', dataAnggaran)
    }

    setPagu(idAnggaran)
    setIdAnggaranBaru(idAnggaran)
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
    const penggunaId = ipcRenderer.sendSync('user:getPenggunaId')
    const data = {
      sumber_dana: pagu?.sumber_dana_id,
      tahun: tahunAktif,
    }

    const idAnggaranBefore = ipcRenderer.sendSync('anggaran:checkBefore', data)
    setTahunAktif(tahunAktif)
    setIdAnggaranBefore(idAnggaranBefore)
    setPenggunaId(penggunaId)

    if (q_mode === 'update' && q_id_anggaran !== undefined) {
      const dataAnggaran = ipcRenderer.sendSync(
        IPC_ANGGARAN.getAnggaranById,
        encode(q_id_anggaran)
      )
      const dataPenjab = ipcRenderer.sendSync(
        IPC_PENJAB.getPenjabById,
        dataAnggaran.idPenjab
      )

      const penjab = {
        id_penjab: dataAnggaran.idPenjab,
        sekolah_id: dataPenjab.sekolahId,
        kepsek: dataPenjab.ks,
        bendahara: dataPenjab.bendahara,
        komite: dataPenjab.komite,
        nip_kepsek: dataPenjab.nipKs,
        nip_bendahara: dataPenjab.nipBendahara,
        nip_komite: dataPenjab.nipKomite,
        email_kepsek: dataPenjab.emailKs,
        email_bendahara: dataPenjab.emailBendahara,
        email_komite: dataPenjab.emailKomite,
        telepon_kepsek: dataPenjab.telpKs,
        telepon_bendahara: dataPenjab.telpBendahara,
      }
      setPenanggungJawab(penjab)
      setIdAnggaranBaru(idAnggaran)
    }
  }, [])

  useEffect(() => {
    if (tahunAktif !== '' && penggunaId !== '' && idAnggaranBefore !== null) {
      if (q_mode === 'create') {
        if (idAnggaranBefore !== '') {
          setOpenModalInit(true)
        } else {
          handleCreateKertasKerja(MODE_CREATE_KERTAS_KERJA.new)
        }
      }
    }
  }, [tahunAktif, idAnggaranBefore, penggunaId])

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
            Menyusun RKAS
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
            <Link to={`/anggaran/mengulas/${idAnggaranBaru}`}>
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
        title="Salin dari RKAS sebelumnya?"
        desc="Anda dapat menyalin isi RKAS pada tahun anggaran sebelumnya ke lembar ini atau membuat RKAS baru."
        isOpen={openModalInit}
        btnCancelText="Buat Baru"
        btnActionText="Salin RKAS"
        onCancel={() => handleCreateKertasKerja(MODE_CREATE_KERTAS_KERJA.new)}
        onSubmit={() => handleCreateKertasKerja(MODE_CREATE_KERTAS_KERJA.salin)}
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
        title="Menyalin RKAS..."
        subtitle="Mohon tunggu sebentar."
        percentage={50}
        isOpen={isSync}
        setIsOpen={setIsSync}
      />
      <FormPenanggungJawabView mode="update" />
    </div>
  )
}

export default MenyusunKertasKerjaView
