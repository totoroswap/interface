import React, { useState } from 'react'
import HomeIcon from '../../assets/svg/menu/home.svg'
import ExchangeIcon from '../../assets/svg/menu/exchange.svg'
import LiquidityIcon from '../../assets/svg/menu/liquidity.svg'
import FarmIcon from '../../assets/svg/menu/farm.svg'
import MallIcon from '../../assets/svg/menu/mall.svg'
import NftIcon from '../../assets/svg/menu/nft.svg'
import MemberIcon from '../../assets/svg/menu/member.svg'
import InfoIcon from '../../assets/svg/menu/info.svg'
import MoreIcon from '../../assets/svg/menu/more.svg'
import TotoroIcon from '../../assets/svg/menu/totoro_icon.png'

import TelegramSvg from '../../assets/svg/menu/telegram.svg'
import TwitterSvg from '../../assets/svg/menu/twitter.svg'
import MoonSvg from '../../assets/svg/menu/theme_moon.svg'
import SunSvg from '../../assets/svg/menu/theme_sun.svg'

import GlobeSvg from '../../assets/svg/menu/globe.svg'

import { useDarkModeManager } from '../../state/user/hooks'
import { LANGUAGES } from '../../i18n'
import { useTranslation } from 'react-i18next'
import { SidebarMenuView, MenuItem } from './style'
import SvgPlus from '../SvgPlus'
import { theme } from '../../theme'

const sidebarMenuList = [
  {
    icon: HomeIcon,
    name: 'Home',
    route: '/home'
  },
  {
    icon: ExchangeIcon,
    name: 'Exchange',
    route: '/swap'
  },
  {
    icon: LiquidityIcon,
    name: 'Liquidity',
    route: '/pool'
  },
  {
    icon: FarmIcon,
    name: 'Farm',
    route: '/farm'
  },
  {
    icon: MallIcon,
    name: 'Mall',
    route: '/mall'
  },
  {
    icon: NftIcon,
    name: 'NFT',
    route: '/nft'
  },
  {
    icon: MemberIcon,
    name: 'Member',
    route: '/member'
  },
  {
    icon: InfoIcon,
    name: 'Info',
    route: '/info'
  },
  {
    icon: MoreIcon,
    name: 'More',
    route: '/more'
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
  const themeData = theme(darkMode)
  console.log('themeData.disabled3', themeData.disabled3)

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
        <div className="menu-footer-l">
          <div className="token-price">
            <img src={TotoroIcon} alt="totoro" />
            <span>$20.23</span>
          </div>
          <div className="language" onClick={() => setShowLanguage(!showLanguage)}>
            <img src={GlobeSvg} />
            {languageCheck && languageCheck.name}
            {showLanguage && (
              <div className="language-list">
                {LANGUAGES.map(item => (
                  <div className="language-item" key={item.key} onClick={() => changeLanguage(item.key)}>
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="menu-footer-r">
          <div className="website">
            <a href="">
              <img src={TelegramSvg} alt="Telegram" />
            </a>
            <a href="">
              <img src={TwitterSvg} alt="Twitter" />
            </a>
          </div>
          <div>
            <div className="theme-switch" onClick={toggleDarkMode}>
              <SvgPlus src={SunSvg} size="24px" color={!darkMode ? themeData.primary1 : themeData.disabled3} />
              <span>/</span>
              <SvgPlus src={MoonSvg} size="24px" color={darkMode ? themeData.primary1 : themeData.disabled3} />
            </div>
          </div>
        </div>
      </div>
    </SidebarMenuView>
  )
}
