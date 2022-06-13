import { Button } from '@wartek-id/button'
import React, { FC, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useLocation, useNavigate } from 'react-router-dom'
import { APP_VERSION } from 'renderer/constants/appConfig'
import { SYNC_PERBARUI_APLIKASI } from 'renderer/constants/routes'
import PageLayout from 'renderer/views/Layout/PageLayout'

const PerbaruiAplikasi: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [labelButton, setLabelButton] = useState('')
  const [desc, setDesc] = useState('')

  const handlePeriksaUpdate = () => {
    // TODO: Get response from API
    navigate(SYNC_PERBARUI_APLIKASI, {
      state: { backgroundLocation: location },
    })
  }

  const checkOnline = () => {
    if (navigator.onLine) {
      // TODO: get data from API
      setLabelButton('Perbarui Aplikasi')
      setDesc(`Wallet now enables Apple Cash customers to send and request money from their Apple Cash card
        \nApple Podcasts includes a new setting to limit episodes stored on your iPhone and automatically delete older ones
        \nFixes an issue where home automations, triggered by people arriving or leaving, may fail
        \nFixes an issue that may cause iPhone SE (3rd gen) to unexpectedly shutdown`)
      return
    } else {
      setLabelButton('Perbarui Aplikasi')
      setDesc('Hak Cipta © 2021 Kemendikbudristek')
    }
  }

  useEffect(() => {
    checkOnline()
  }, [])

  return (
    <PageLayout>
      <div className="flex w-[980px] mt-[45px] mx-auto border-b pb-14">
        <div className="flex">
          <img className="icon-64" src="./assets/logo-kemdikbud.png" />
          <div className="ml-5 mt-1">
            <div className="font-semibold text-lg mb-3">
              Aplikasi Rencana Kegiatan <br />
              dan Anggaran Sekolah
            </div>
            <div className="text-gray-50 mb-1 text-sm">
              Versi {APP_VERSION}{' '}
            </div>
            <div className="text-gray-50 text-sm">
              <ReactMarkdown>{desc}</ReactMarkdown>
            </div>
            <Button
              className="my-3"
              color="white"
              variant="solid"
              size="sm"
              onClick={handlePeriksaUpdate}
            >
              {labelButton}
            </Button>
            <div className="text-blue-800 text-sm">
              “Periksa Versi Terbaru” membutuhkan koneksi internet
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default PerbaruiAplikasi
