import React, { FC } from 'react'

import { Input } from '@wartek-id/input'

const FormKertasKerjaView: FC = () => {
  return (
    <div>
      <div className="flex pb-5">
        <div className="flex-1 pr-7">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Nama Kepala Sekolah
          </div>
          <Input
            type="text"
            placeholder="Masukkan nama kepala sekolah"
            id="nama_kepala_sekolah"
            name="nama_kepala_sekolah"
          />
        </div>
        <div className="flex-1 pr-7">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Nama Bendahara
          </div>
          <Input
            type="text"
            placeholder="Masukkan nama bendahara"
            id="nama_bendahara"
            name="nama_bendahara"
          />
        </div>
        <div className="flex-1">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Nama Komite
          </div>
          <Input
            type="text"
            placeholder="Masukkan nama komite"
            id="nama_komite"
            name="nama_komite"
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex-1 pr-7">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            NIP Kepala Sekolah (Opsional)
          </div>
          <Input
            type="text"
            placeholder="Masukkan nip kepala sekolah"
            id="nip_kepala_sekolah"
            name="nip_kepala_sekolah"
          />
        </div>
        <div className="flex-1 pr-7">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            NIP Bendahara (Opsional)
          </div>
          <Input
            type="text"
            placeholder="Masukkan nip bendahara"
            id="nip_bendahara"
            name="nip_bendahara"
          />
        </div>
        <div className="flex-1">
          <div className="text-[14px] pb-[4px] font-normal text-gray-900">
            Email Komite
          </div>
          <Input
            type="text"
            placeholder="Masukkan email komite"
            id="email_komite"
            name="email_komite"
          />
        </div>
      </div>
    </div>
  )
}

export default FormKertasKerjaView
