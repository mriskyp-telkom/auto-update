import React, { FC } from 'react'

import clsx from 'clsx'

const LoginHeader: FC = () => {
  return (
    <div>
      <img
        className="mx-auto mt-[40px] icon-64"
        src="./assets/logo-arkas.png"
      />
      <div
        className={clsx(
          'm-auto text-center w-[244px] pt-[20px] pb-[60px]',
          'font-semibold text-[19px] text-gray-900'
        )}
      >
        Aplikasi Rencana Kegiatan dan Anggaran Sekolah
      </div>
    </div>
  )
}

export default LoginHeader
