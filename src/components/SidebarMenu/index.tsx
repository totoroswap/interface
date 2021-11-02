import React, { useContext, useState } from 'react'
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
import SettingSvg from '../../assets/svg/menu/setting.svg'

import { useDarkModeManager } from '../../state/user/hooks'
import { LANGUAGES } from '../../i18n'
import { useTranslation } from 'react-i18next'
import { SidebarMenuView, MenuItem, ShowSmall, HideSmall } from './style'
import SvgPlus from '../SvgPlus'
import Drawer from '../Drawer'
import { useCloseModals, useModalOpen } from '../../state/application/hooks'
import { ApplicationModal } from '../../state/application/actions'
import { ThemeContext } from 'styled-components'
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
interface MenuProps {
  drawer: boolean
}

export default function SidebarMenu() {
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useCloseModals()
  const { i18n } = useTranslation()
  const [showLanguage, setShowLanguage] = useState(false)
  const languageCheck = LANGUAGES.find(i => i.key === i18n.language)
  const changeLanguage = (key: string) => {
    setShowLanguage(false)
    i18n.changeLanguage(key)
  }
  const theme = useContext(ThemeContext)
  const MenuContent = ({ drawer }: MenuProps) => {
    const isMini = !drawer && open
    return (
      <SidebarMenuView>
        <div className="menu-list">
          {sidebarMenuList.map((item, index) => (
            <MenuItem key={index} to={item.route} onClick={() => (drawer ? toggle() : null)}>
              <SvgPlus src={item.icon} size="24px" color={theme.text3} />
              <span>{item.name}</span>
            </MenuItem>
          ))}
        </div>
        {isMini ? (
          <div className="menu-footer mini" onClick={toggle}>
            <SvgPlus src={SettingSvg} size="24px" color={theme.text3} />
          </div>
        ) : (
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
                  <SvgPlus src={SunSvg} size="24px" color={!darkMode ? theme.primary1 : theme.disabled3} />
                  <span>/</span>
                  <SvgPlus src={MoonSvg} size="24px" color={darkMode ? theme.text1 : theme.disabled3} />
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarMenuView>
    )
  }
  return (
    <>
      <HideSmall open={open}>
        <MenuContent drawer={false} />
      </HideSmall>
      <ShowSmall>
        <Drawer placement="left" onClose={toggle} visible={open} vWidth="auto" topBlank="65px">
          <MenuContent drawer={true} />
        </Drawer>
      </ShowSmall>
    </>
  )
}
