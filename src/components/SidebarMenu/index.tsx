import React from 'react'
import ExchangeIcon from '../../assets/svg/menu_line.svg'

import { SidebarMenuView } from './style'
export default function SidebarMenu() {
  const sidebarMenuList = [
    {
      icon: ExchangeIcon,
      name: 'Exchange',
      router: '/swap'
    }
  ]
  return (
    <SidebarMenuView>
      <div className="menu-list">
        {sidebarMenuList.map((item, index) => (
          <div className="menu-item" key={index}>
            <img src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="menu-footer"></div>
    </SidebarMenuView>
  )
}
