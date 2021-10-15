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
      background: #fbfaf4;
    }
  }
`
