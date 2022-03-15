import React, { FC, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'
import { Avatar } from '@wartek-id/avatar'

import { Listbox } from '@headlessui/react'

import syncToIPCMain from 'renderer/configs/ipc'

const menus = [
  { id: 1, icon: 'logout', route: '/logout', key: 'logout', label: 'Keluar' },
]

const MenuProfileComponent: FC = () => {
  const location = useLocation()

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [selectedValue, setSelectedValue] = useState(menus[0])

  useEffect(() => {
    setIsUserLoggedIn(syncToIPCMain('token:isUserLoggedIn'))
  }, [])

  return (
    isUserLoggedIn && (
      <span className="flex items-center">
        <span>
          <Avatar
            src=""
            alt="Some Alt"
            size="lg"
            shape="circle"
            className="mr-3"
          />
        </span>
        <span className="mt-2">
          <Listbox value={selectedValue} onChange={setSelectedValue}>
            {({ open }) => (
              <>
                <Listbox.Button>
                  <span className="w-full flex justify-between items-center">
                    <Icon as="i" color="default" fontSize="default">
                      {open ? 'expand_less' : 'expand_more'}
                    </Icon>
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  className="absolute bg-white rounded-b right-4 w-[177px]"
                  style={{ boxShadow: '0px 8px 20px rgba(37, 40, 43, 0.2)' }}
                >
                  {menus.map((menu, index) => (
                    <Link
                      key={index}
                      to={menu.route}
                      state={{ backgroundLocation: location }}
                    >
                      <Listbox.Option
                        key={index}
                        className="flex text-large px-6 py-3 font-normal text-black hover:bg-gray-5"
                        value={menu.key}
                      >
                        <Icon
                          as="i"
                          color="default"
                          fontSize="default"
                          className="mr-3"
                        >
                          {menu.icon}
                        </Icon>
                        {menu.label}
                      </Listbox.Option>
                    </Link>
                  ))}
                </Listbox.Options>
              </>
            )}
          </Listbox>
        </span>
      </span>
    )
  )
}

export default MenuProfileComponent
