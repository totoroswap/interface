import styled from 'styled-components'

export const HeaderView = styled.div`
  width: 100%;
  height: 64px;
  position: relative;
  display: flex;
  background: #ffffff;
  box-shadow: 0 2px 0 0 #eae8d6;
  background: ${({ theme }) => theme.bg1};
  .header-left {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    .menu-tab {
      width: 24px;
      height: 24px;
      margin-left: 16px;
      cursor: pointer;
    }
    .logo {
      width: 96px;
      height: 28px;
      margin-left: 20px;
    }
  }
  .header-center {
    flex: 1;
  }
  .header-right {
    display: flex;
    align-items: center;
    .connect-wallet {
      width: 99px;
      height: 40px;
      background: #135658;
      box-shadow: 0px -4px 0px 0px rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      font-size: 16px;
      color: #fff4df;
      line-height: 40px;
    }
  }
`
