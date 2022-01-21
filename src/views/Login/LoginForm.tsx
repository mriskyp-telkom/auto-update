import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@wartek-id/button'
import { Input, InputGroup } from '@wartek-id/input'

const LoginForm: FC = () => {
  return (
    <div>
      <div>
        <div className="text-[14px] pb-[4px] font-normal text-gray-900">
          Email
        </div>
        <Input
          type="text"
          placeholder="Masukkan email yang terdaftar di sekolah"
        />
      </div>
      <div className="pt-[20px]">
        <div className="text-[14px] pb-[4px] font-normal text-gray-900">
          Password
        </div>
        <InputGroup>
          <Input type="password" placeholder="Masukkan password" />
        </InputGroup>
      </div>
      <div className="text-[16px] pt-[8px] pb-[50px] font-normal">
        Lupa Password? <span className="text-blue-700">Reset Akun</span>
      </div>
      <div className="grid justify-items-end pb-[20px]">
        <Link to="/dashboard">
          <Button className="px-[72px]" color="blue" size="lg" variant="solid">
            Masuk
          </Button>
        </Link>
      </div>
      <div className="text-blue-700 text-[12px] text-right">
        <b>“Reset Akun”</b> membutuhkan koneksi internet
      </div>
    </div>
  )
}

export default LoginForm
