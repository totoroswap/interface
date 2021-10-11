import React from 'react'
import styled from 'styled-components'
import Settings from '../Settings'
import { RowBetween } from '../Row'
import ExchangeTime from '../ExchangeTime'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  margin-bottom: -4px;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.text2};
`
const TitleText = styled.div`
  color: ${({ theme }) => theme.text1};
`
const TitleMenu = styled.div`
  display: flex;
  align-items: center;
`
export default function SwapHeader() {
  return (
    <StyledSwapHeader>
      <RowBetween>
        <TitleText>Exchange</TitleText>
        <TitleMenu>
          <Settings />
          {
            false && <ExchangeTime />
          }
        </TitleMenu>
      </RowBetween>
    </StyledSwapHeader>
  )
}
