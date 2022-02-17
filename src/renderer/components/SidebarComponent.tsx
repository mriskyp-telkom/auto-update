import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'

import { Icon } from '@wartek-id/icon'

import clsx from 'clsx'

const MenusTop = () => {
  return [
    {
      route: '/anggaran',
      label: 'Anggaran',
    },
    {
      route: '/administration',
      label: 'Tata Usaha',
    },
    {
      route: '/archieve',
      label: 'Arsip',
    },
  ]
}

const MenusBottom = () => {
  return [
    {
      route: '/tutorial',
      icon: 'info',
      iconType: 'outlined',
      label: 'Tutorial',
    },
    {
      route: '/faq',
      icon: 'forum',
      iconType: 'outlined',
      label: 'FAQ',
    },
    {
      route: '/help',
      icon: 'help_outline',
      iconType: 'default',
      label: 'Bantuan',
    },
    {
      route: '/update-app',
      icon: 'update',
      iconType: 'default',
      label: 'Perbarui Aplikasi',
    },
  ]
}

const SidebarComponent: FC = () => {
  const activeClassName = 'rounded bg-blue-700 font-semibold'
  return (
    <nav className="w-[260px] h-screen bg-blue-900 px-[21px] py-[57px] text-white text-[16px]">
      <ul>
        {MenusTop().map((menu) => {
          return (
            <li key={menu.route}>
              <NavLink to={menu.route}>
                {({ isActive }) => (
                  <div
                    className={clsx(
                      isActive ? activeClassName : undefined,
                      'px-[23px] py-[8px] my-[1px] hover:font-semibold'
                    )}
                  >
                    {menu.label}
                  </div>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
      <ul className="absolute bottom-[29px] w-[217px]">
        {MenusBottom().map((menu) => {
          return (
            <li key={menu.route}>
              <NavLink to={menu.route}>
                {({ isActive }) => (
                  <div
                    className={clsx(
                      isActive ? activeClassName : undefined,
                      'flex items-center px-[12px] py-[8px] hover:font-semibold'
                    )}
                  >
                    <Icon
                      as="i"
                      color="default"
                      fontSize="default"
                      style={{ color: '#ffffff' }}
                      className={clsx(
                        menu.iconType === 'outlined'
                          ? 'material-icons-outlined'
                          : '',
                        'mr-[15px]'
                      )}
                    >
                      {menu.icon}
                    </Icon>
                    {menu.label}
                  </div>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default SidebarComponent
