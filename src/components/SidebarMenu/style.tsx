import styled from 'styled-components'

export const SidebarMenuView = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  background: #ffffff;
  .menu-list {
    flex: 1;
    .menu-item {
      padding: 10px 5px 10px 15px;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .menu-footer {
    height: 100px;
    border-radius: 30px 30px 0 0;
    background: #f2f0e8;
  }
`
