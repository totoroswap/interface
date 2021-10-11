import React from 'react'
import styled, { keyframes } from 'styled-components'
import { X } from 'react-feather'
const DrawerView = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  padding: 0;
  background: rgba(0, 0, 0, 0.4);
`
const translate = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
`

const DrawerViewPanel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 280px;
  max-width: 90vw;
  height: 100%;
  background: ${({ theme }) => theme.bg1};
  padding-top: 50px;
  animation: ${translate} 200ms;
`

const XStyle = styled.span`
  /* × */

  position: absolute;
  width: 20px;
  height: 20px;
  right: 18px;
  top: 18px;
`

export default function Drawer({ children, visible, onClose, placement }: any) {
  if (!visible) {
    return null
  }
  return (
    <DrawerView onClick={onClose}>
      {
        <DrawerViewPanel onClick={() => false}>
          <XStyle onClick={onClose}>
            <X size={20}></X>
          </XStyle>
          {children}
        </DrawerViewPanel>
      }
    </DrawerView>
  )
}
