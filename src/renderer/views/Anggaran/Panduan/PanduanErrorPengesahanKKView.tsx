import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import InfoDialogComponent from 'renderer/components/Dialog/InfoDialogComponent'

import PanduanCardComponent from 'renderer/components/Card/PanduanCardComponent'

import { Icon } from '@wartek-id/icon'

import syncToIPCMain from 'renderer/configs/ipc'

import { IPC_ANGGARAN } from 'global/ipc'

import { copyKertasKerja } from 'renderer/utils/copy-writing'

const PanduanErrorPengesahanKKView: FC = () => {
  const { q_id_anggaran } = useParams()

  const idAnggaran = decodeURIComponent(q_id_anggaran)

  const [openCatatan, setOpenCatatan] = useState(false)
  const [alasanPenolakan, setAlasanPenolakan] = useState('')

  useEffect(() => {
    const dataAnggaran = syncToIPCMain(IPC_ANGGARAN.getAnggaranById, idAnggaran)
    setAlasanPenolakan(dataAnggaran.alasanPenolakan)
  }, [])

  return (
    <>
      <PanduanCardComponent type="failed">
        <>
          <div className="mb-2 font-semibold">
            <Icon
              as="i"
              color="default"
              fontSize="small"
              style={{ fontSize: '14px', color: '#e02d38' }}
              className="mr-[10px]"
            >
              cancel
            </Icon>
            {copyKertasKerja()} Belum Disetujui
          </div>
          <ul className="list font-normal text-base text-gray-900 ml-7">
            <li>
              <span>
                {copyKertasKerja()} Anda belum bisa disetujui karena ada
                beberapa revisi yang perlu dilakukan.
              </span>
            </li>
            <li>
              <span>
                Silakan lihat catatan dari dinas dan lakukan revisi.{' '}
                <a
                  className="cursor-pointer underline"
                  onClick={() => setOpenCatatan(true)}
                >
                  Lihat Catatan Revisi
                </a>
              </span>
            </li>
          </ul>
        </>
      </PanduanCardComponent>
      <InfoDialogComponent
        title="Catatan Revisi Dinas"
        text={alasanPenolakan}
        width={720}
        isOpen={openCatatan}
        onCancel={() => setOpenCatatan(false)}
      />
    </>
  )
}

export default PanduanErrorPengesahanKKView
