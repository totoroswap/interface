import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const SidebarMenuView = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background: ${({ theme }) => theme.bg1};

  .menu-list {
    flex: 1;
  }

  .menu-footer {
    height: 100px;
    border-radius: 30px 30px 0 0;
    background: #f2f0e8;
    padding: 10px;

    .theme-switch-btn {
      cursor: pointer;
      display: inline-block;
    }

    .language-switch-btn {
      position: relative;
      cursor: pointer;

      .language-list {
        width: 120px;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 20px;
        transform: translateY(-100%);
        background: #c9c9c9;

        .language-item {
          padding: 10px;
          background: #ffffff;
        }
      }
    }
  }
`
export const MenuItem = styled(NavLink)`
  padding: 10px 5px 10px 15px;
  display: flex;
  align-items: center;
  text-decoration: none;
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  &.active {
    background: #f2f0e8;
  }
`
