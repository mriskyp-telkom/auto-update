import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'

import DropdownComponent from 'renderer/components/DropdownComponent'
import PDFViewerComponent from 'renderer/components/PDFViewer/PDFViewerComponent'
import PanduanCetakKKView from 'renderer/views/Anggaran/Panduan/PanduanCetakKKView'

import { STATUS_KERTAS_KERJA } from 'global/constants'

import syncToIPCMain from 'renderer/configs/ipc'

import { IPC_ANGGARAN } from 'global/ipc'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

export const CETAK_RKAS_OPTIONS = [
  { id: 1, key: 'tahap', label: 'Lihat per tahapan' },
  { id: 2, key: 'tahun', label: 'Lihat per tahun' },
]

const CetakKertasKerjaView = () => {
  const navigate = useNavigate()
  const { q_id_anggaran } = useParams()

  const [tahun, setTahun] = useState(null)

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const handleChange = () => {
    //handle action
  }

  useEffect(() => {
    const pagu = syncToIPCMain(IPC_ANGGARAN.getPagu, q_id_anggaran)
    setTahun(pagu?.tahun_anggaran)
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
            Mencetak {copyKertasKerja(STATUS_KERTAS_KERJA.approved)} {tahun}
          </div>
          <div
            className="text-base font-semibold text-gray-600 mb-[57px]"
            style={{ display: 'inline-block' }}
          >
            Bos reguler {tahun}
          </div>
          <div>
            <DropdownComponent
              width={476}
              options={CETAK_RKAS_OPTIONS}
              handleChange={handleChange}
            />
          </div>
        </span>
        <span>
          <PanduanCetakKKView />
        </span>
      </div>
      <div className="max-h-[715px] scrollBar overflow-y-scroll mt-4 mx-10">
        <PDFViewerComponent />
      </div>
    </div>
  )
}

export default CetakKertasKerjaView
