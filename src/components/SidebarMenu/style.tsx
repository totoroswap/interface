import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FlexCenterH } from '../../theme'

export const SidebarMenuView = styled.div`
  width: 240px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background: ${({ theme }) => theme.bg1};
  .menu-list {
    flex: 1;
    overflow-y: auto;
  }

  .menu-footer {
    height: 110px;
    background: ${({ theme }) => theme.bg6};
    border-radius: 40px 40px 0 0;
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr 100px;
    &.mini {
      width: 52px;
      height: 55px;
      border-radius: 20px 20px 0 0;
      cursor: pointer;
    }
    .menu-footer-l > div,
    .menu-footer-r > div {
      margin-top: 16px;
    }

    .token-price,
    .language {
      ${() => FlexCenterH}
      img {
        width: 24px;
        height: 24px;
        margin-right: 4px;
      }
      span {
        font-size: 16px;
        font-weight: 500;
      }
    }
    .language {
      position: relative;
      cursor: pointer;
      .language-list {
        width: 120px;
        position: absolute;
        left: 0;
        top: -5px;
        border-radius: 5px;
        overflow: hidden;
        transform: translateY(-100%);
        background: ${({ theme }) => theme.bg1};
        box-shadow: 2px 2px 2px 2px ${({ theme }) => theme.bg6};
        .language-item {
          padding: 10px;
          background: ${({ theme }) => theme.bg1};
        }
      }
    }
    .website {
      ${() => FlexCenterH}
      justify-content: flex-end;
      img {
        width: 24px;
        height: 24px;
        margin: 0 5px;
      }
    }

    .theme-switch {
      ${() => FlexCenterH}
      justify-content: flex-end;
      width: 100%;
      height: 100%;
      cursor: pointer;
      span {
        margin: 0 2px;
      }
    }
  }
`
export const MenuItem = styled(NavLink)`
  ${() => FlexCenterH}
  width: 240px;
  height: 48px;
  text-decoration: none;
  background: ${({ theme }) => theme.bg1};
  color: ${({ theme }) => theme.text3};
  font-weight: 500;
  & > div {
    margin: 0 12px 0 16px;
  }
  &.active {
    background: ${({ theme }) => theme.bg2};
  }
`
export const HideSmall = styled.div<{ open: boolean }>`
  transition: all 200ms;
  width: ${({ open }) => (open ? '52px' : '240px')};
  overflow: hidden;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `};
`
export const ShowSmall = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
  `};
`
