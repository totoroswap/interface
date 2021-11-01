import React, { ReactNode } from 'react'
import SidebarMenu from '../SidebarMenu'
import Header from '../Header'
import { LayoutView } from './style'
import BGImg from '../../assets/images/trees_bg.png'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <LayoutView>
      <Header />
      <div className="layout-main">
        <SidebarMenu />
        <div className="layout-box">
          {children}
          <div className="layout-bg">
            <img src={BGImg} />
          </div>
        </div>
      </div>
    </LayoutView>
  )
}
