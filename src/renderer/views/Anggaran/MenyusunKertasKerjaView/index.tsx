import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

import AmountCardComponent from 'renderer/components/Card/AmountCardComponent'
import AlertDialogComponent from 'renderer/components/Dialog/AlertDialogComponent'
import SyncDialogComponent from 'renderer/components/Dialog/SyncDialogComponent'

import PanduanMenyusunKKView from 'renderer/views/Anggaran/Panduan/PanduanMenyusunKKView'
import PanduanErrorDataSentralKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorDataSentralKKView'
import PanduanErrorSisaDanaKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorSisaDanaKKView'
import PanduanErrorPengesahanKKView from 'renderer/views/Anggaran/Panduan/PanduanErrorPengesahanKKView'

import TabelMenyusunKertasKerjaView from './TabelMenyusunKertasKerjaView'
import syncToIPCMain from 'renderer/configs/ipc'

import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@wartek-id/tabs'
import { Icon } from '@wartek-id/icon'
import { Button } from '@wartek-id/button'

import { AnggaranStates, useAnggaranStore } from 'renderer/stores/anggaran'

import { IPC_ANGGARAN, IPC_KK } from 'global/ipc'
import { STATUS_KERTAS_KERJA } from 'global/constants'
import { DATA_BULAN } from 'renderer/constants/general'
import {
  RESPONSE_PENGESAHAN,
  ALERT_MENGULAS,
  MODE_CREATE_KERTAS_KERJA,
} from 'renderer/constants/anggaran'
import { APP_CONFIG } from 'renderer/constants/appConfig'

import { AlertType } from 'renderer/types/ComponentType'
import { formatDateTimeStatus } from 'renderer/utils/date-formatting'

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
  const [idAnggaran, setIdAnggaran] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [anggaranDetail, setAnggaranDetail] = useState(null)
  const [validasiFlagPeriode, setvalidasiFlagPeriode] = useState(new Map())

  const alertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.alertMengulas
  )

  const setAlertMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.setAlertMengulas
  )

  const responseMengulas = useAnggaranStore(
    (state: AnggaranStates) => state.responseMengulas
  )

  const penanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.penanggungJawab
  )

  const setPenanggungJawab = useAnggaranStore(
    (state: AnggaranStates) => state.setPenanggungJawab
  )

  const isFocused = useAnggaranStore((state: AnggaranStates) => state.isFocused)
  const setIsFocused = useAnggaranStore(
    (state: AnggaranStates) => state.setIsFocused
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
    return syncToIPCMain('penjab:addPenjab', penjab)
  }

  const setPagu = (idAnggaran: string) => {
    const getPagu = syncToIPCMain(IPC_ANGGARAN.getPagu, idAnggaran)
    const dataAnggaran = syncToIPCMain(IPC_ANGGARAN.getAnggaranById, idAnggaran)
    setAnggaranDetail(dataAnggaran)
    setJumlahPagu(getPagu.pagu)
    setTotal(getPagu.total)
    setSisa(getPagu.sisa)
  }

  const setRapbsLastUpdate = (idAnggaran: string) => {
    const lastUpdate = syncToIPCMain(IPC_KK.getRapbsLastUpdate, idAnggaran)
    setLastUpdate(lastUpdate)
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
      idAnggaran = syncToIPCMain('anggaran:addAnggaran', dataAnggaran)
    }

    if (mode === MODE_CREATE_KERTAS_KERJA.salin) {
      dataAnggaran = {
        ...dataAnggaran,
        id_anggaran_before: idAnggaranBefore,
      }
      idAnggaran = syncToIPCMain('anggaran:copyAnggaran', dataAnggaran)
    }
    setIdAnggaran(idAnggaran)
    setPagu(idAnggaran)
    setRapbsLastUpdate(idAnggaran)
    setIsFocused(true)
    setIsSync(false)
  }

  useEffect(() => {
    const id_anggaran =
      q_id_anggaran != null ? decodeURIComponent(q_id_anggaran) : idAnggaran

    if (isFocused && id_anggaran != null && id_anggaran !== '') {
      setPagu(id_anggaran)
      setRapbsLastUpdate(id_anggaran)
    }
  }, [isFocused])

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const getPanduan = (): any => {
    if (anggaranDetail !== null) {
      // Panduan untuk status draft
      if (anggaranDetail.status === STATUS_KERTAS_KERJA.draft) {
        return <PanduanMenyusunKKView />
      }
      // Panduan untuk status perlu revisi (error sisa dana)
      if (
        anggaranDetail.status === STATUS_KERTAS_KERJA.not_approved &&
        anggaranDetail.isPengesahan === 2
      ) {
        return <PanduanErrorSisaDanaKKView />
      }
      // Panduan untuk status perlu revisi (error data central)
      if (
        anggaranDetail.status === STATUS_KERTAS_KERJA.not_approved &&
        anggaranDetail.isPengesahan === 3
      ) {
        return <PanduanErrorDataSentralKKView />
      }
      // Panduan untuk status perlu revisi (error pengesahan ditolak)
      if (anggaranDetail.status === STATUS_KERTAS_KERJA.not_approved) {
        return <PanduanErrorPengesahanKKView />
      }
    }
    return null
  }

  useEffect(() => {
    const tahunAktif = syncToIPCMain('config:getConfig', APP_CONFIG.tahunAktif)
    const penggunaId = syncToIPCMain('user:getPenggunaId')
    const data = {
      sumber_dana: pagu?.sumber_dana_id,
      tahun: tahunAktif,
    }

    const idAnggaranBefore = syncToIPCMain('anggaran:checkBefore', data)
    setTahunAktif(tahunAktif)
    setIdAnggaranBefore(idAnggaranBefore)
    setPenggunaId(penggunaId)

    if (q_mode === 'update' && q_id_anggaran !== undefined) {
      const id_anggaran = decodeURIComponent(q_id_anggaran)
      setIdAnggaran(id_anggaran)
      setRapbsLastUpdate(id_anggaran)
      setPagu(id_anggaran)
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

  useEffect(() => {
    if (q_id_anggaran !== '') {
      const res = syncToIPCMain(
        IPC_KK.getListValidasiReferensiPeriode,
        decodeURIComponent(q_id_anggaran)
      )
      const m = new Map()
      if (res?.error) {
        // TODO: should display error modal
      } else {
        if (res?.value) {
          for (const v of res.value) {
            m.set(v.idPeriode, v.isValidate)
            setvalidasiFlagPeriode(m)
          }
        }
      }
    }
  }, [])

  const checkFlag = (id: number): boolean => {
    const v = validasiFlagPeriode.get(id)
    if (v !== undefined && v > 0) {
      return true
    }

    return false
  }

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
            <Link
              to={`/form/penanggung-jawab/update/${encodeURIComponent(
                idAnggaran
              )}`}
              state={{ backgroundLocation: location }}
            >
              <Icon
                as="button"
                color="default"
                fontSize="default"
                className="ml-[10px]"
                style={{ color: '#054BCC' }}
              >
                edit
              </Icon>
            </Link>
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[88px]"
            style={{ display: 'inline-block' }}
          >
            BOS REGULER {tahunAktif}
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
              to={`/form/kertas-kerja/create/${encodeURIComponent(idAnggaran)}`}
              state={{ backgroundLocation: location }}
            >
              <Button color="white" size="md" variant="solid" className="mr-3">
                <Icon as="i" color="default" fontSize="default">
                  add
                </Icon>
                Tambah Kegiatan
              </Button>
            </Link>
            <Link to={`/anggaran/mengulas/${encodeURIComponent(idAnggaran)}`}>
              <Button color="black" size="md" variant="solid">
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
            {lastUpdate && (
              <div
                className="w-full flex text-center justify-end font-normal 
              text-tiny text-blue-700 pb-[28px]"
              >
                <Icon
                  as="i"
                  color="default"
                  fontSize="default"
                  className="ml-[6px]"
                  style={{ fontSize: '18px', color: '#0B5FEF' }}
                >
                  done
                </Icon>
                Tersimpan otomatis {formatDateTimeStatus(new Date(lastUpdate))}
              </div>
            )}
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
                  anggaranDetail?.status === STATUS_KERTAS_KERJA.not_approved &&
                  anggaranDetail?.isPengesahan === 2 &&
                  sisa !== 0
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
                <Tab
                  key={bulan.id}
                  className={
                    checkFlag(bulan.id)
                      ? 'capitalize-first text-red-600'
                      : 'capitalize-first'
                  }
                >
                  {bulan.name}
                </Tab>
              ))}
            </TabList>
          </div>
          <TabPanels>
            {DATA_BULAN.map((bulan) => (
              <TabPanel key={bulan.id}>
                <TabelMenyusunKertasKerjaView
                  bulan={bulan}
                  idAnggaran={idAnggaran}
                />
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
    </div>
  )
}

export default MenyusunKertasKerjaView
