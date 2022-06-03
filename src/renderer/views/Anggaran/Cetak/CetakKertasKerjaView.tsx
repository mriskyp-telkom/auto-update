import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'

import PDFViewerComponent from 'renderer/components/PDFViewer/PDFViewerComponent'

const CetakKertasKerjaView = () => {
  const navigate = useNavigate()


  const handleBackToBeranda = () => {
    navigate('/anggaran')
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
        </span>
      </div>
      <PDFViewerComponent />
    </div>
  )
}

export default CetakKertasKerjaView
