import { Button } from '@wartek-id/button'
import React, { FC } from 'react'
import { APP_VERSION } from 'renderer/constants/appConfig'
import PageLayout from 'renderer/views/Layout/PageLayout'

const PerbaruiAplikasi: FC = () => {
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
              Hak Cipta &copy; 2021 Kemendikbudristek
            </div>
            <Button className="my-3" color="white" variant="solid" size="sm">
              Periksa Versi Terbaru
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
