import styled from 'styled-components'

export const LayoutView = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .layout-main {
    flex: 1;
    display: flex;
    .layout-box {
      flex: 1;
      overflow-y: auto;
      position: relative;
      background: ${({ theme }) => theme.bg2};
      .layout-bg {
        position: absolute;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        font-size: 0;
        img {
          //position: absolute;
          //left: 50%;
          //top: 50%;
          //transform: translate(-50%, -50%);
          min-width: 100%;
          min-height: 200px;
          max-height: 274px;
          padding: 0;
          margin: 0;
          ${({ theme }) => theme.mediaWidth.upToSmall`
            min-height: 60px;
            max-height: 120px;
          `};
        }
      }
    }
  }
`
