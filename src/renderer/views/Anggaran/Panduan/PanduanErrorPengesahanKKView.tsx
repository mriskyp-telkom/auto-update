import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import InfoDialogComponent from 'renderer/components/Dialog/InfoDialogComponent'

import CardPanduanAnggaranView from 'renderer/views/Anggaran/CardPanduanAnggaranView'

import { Icon } from '@wartek-id/icon'

import syncToIPCMain from 'renderer/configs/ipc'

import { IPC_ANGGARAN } from 'global/ipc'

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
      <CardPanduanAnggaranView type="failed">
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
            RKAS Belum Disetujui
          </div>
          <ul className="list font-normal text-base text-gray-900 ml-7">
            <li>
              <span>
                RKAS Anda belum bisa disetujui karena ada beberapa revisi yang
                perlu dilakukan.
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
      </CardPanduanAnggaranView>
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
