import React from 'react'
import styled from 'styled-components'
import { Clock } from 'react-feather'
const ClockIcon = styled(Clock)`
  height: 20px;
  width: 20px;
  margin-left: 22px;
  > * {
    stroke: ${({ theme }) => theme.text2};
  }

  :hover {
    opacity: 0.7;
  }
`
export default function ExchangeTime () {
  return (
    <ClockIcon>

    </ClockIcon>
  )
}