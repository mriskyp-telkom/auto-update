import React, { useEffect, useState } from 'react'
import fs from 'fs'
import { useNavigate, useParams } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'

import DropdownComponent from 'renderer/components/DropdownComponent'
import PDFViewerComponent from 'renderer/components/PDFViewer/PDFViewerComponent'
import PanduanCetakKKView from 'renderer/views/Anggaran/Panduan/PanduanCetakKKView'

import { CETAK_RKAS_OPTIONS } from 'renderer/constants/anggaran'
import { STATUS_KERTAS_KERJA } from 'global/constants'

import syncToIPCMain from 'renderer/configs/ipc'

import { IPC_ANGGARAN } from 'global/ipc'

import { copyKertasKerja } from 'renderer/utils/copy-writing'
import { GetPrintPDFPathRequest } from 'global/types/Anggaran'

const CetakKertasKerjaView = () => {
  const ipc = window.require('electron').ipcRenderer
  const navigate = useNavigate()
  const { q_id_anggaran } = useParams()

  const [tahun, setTahun] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [pdfPath, setPdfPath] = useState('')

  const handleBackToBeranda = () => {
    navigate('/anggaran')
  }

  const handleChange = (key: string) => {
    const idAnggaran = decodeURIComponent(q_id_anggaran)
    if ((idAnggaran !== undefined || idAnggaran !== '') && tahun !== null) {
      setIsLoading(true)
      isLoading

      const templateName = `${key}-${tahun}`
      const filename = templateName + '-output'
      const request = {
        template: templateName,
        filename: filename,
        listIdAnggaran: [decodeURIComponent(q_id_anggaran)],
      } as GetPrintPDFPathRequest

      const printPath = ipc.invoke('utils:getPrintPDFPathAsync', request)
      printPath
        .then((res: any) => {
          if (!res?.error) {
            try {
              const stat = fs.statSync(res.value)
              if (stat.size > 10100) {
                setPdfPath(res.value)
              }
            } catch (error) {
              error
            }
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
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
        <PDFViewerComponent file={pdfPath} />
      </div>
    </div>
  )
}

export default CetakKertasKerjaView
