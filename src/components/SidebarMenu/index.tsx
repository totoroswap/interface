import React, { useState } from 'react'
import ExchangeIcon from '../../assets/svg/tokenlist.svg'

import { SidebarMenuView, MenuItem } from './style'
import { Moon, Sun, Globe } from 'react-feather'
import { useDarkModeManager } from '../../state/user/hooks'
import { LANGUAGES } from '../../i18n'
import { useTranslation } from 'react-i18next'

const sidebarMenuList = [
  {
    icon: ExchangeIcon,
    name: 'Exchange',
    route: '/swap'
  },
  {
    icon: ExchangeIcon,
    name: 'Liquidity',
    route: '/pool'
  }
]
export default function SidebarMenu() {
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const { i18n } = useTranslation()
  const [showLanguage, setShowLanguage] = useState(false)
  const languageCheck = LANGUAGES.find(i => i.key === i18n.language)
  const changeLanguage = (key: string) => {
    setShowLanguage(false)
    i18n.changeLanguage(key)
  }

  return (
    <SidebarMenuView>
      <div className="menu-list">
        {sidebarMenuList.map((item, index) => (
          <MenuItem key={index} to={item.route}>
            <img src={item.icon} alt={item.name} />
            <span>{item.name}</span>
          </MenuItem>
        ))}
      </div>
      <div className="menu-footer">
        <div className="theme-switch-btn" onClick={toggleDarkMode}>
          {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          {darkMode ? 'Light Theme' : 'Dark Theme'}
        </div>
        <div className="language-switch-btn" onClick={() => setShowLanguage(!showLanguage)}>
          <Globe size={19} />
          {languageCheck && languageCheck.name}
          {showLanguage && (
            <div className="language-list">
              {LANGUAGES.map(item => (
                <div className="language-item" onClick={() => changeLanguage(item.key)}>
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </SidebarMenuView>
  )
}
