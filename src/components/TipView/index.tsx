import styled from 'styled-components'
import React from 'react'

const TipsView = styled.span`
  position: relative;
  cursor: pointer;

  & > span {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-left: 10px;
    border-radius: 50%;
    text-align: center;
    line-height: 15px;
    color: ${({ theme }) => theme.text1};
    border: 1px solid ${({ theme }) => theme.text1};
    box-sizing: border-box;
    font-size: 10px;
  }

  :hover div {
    display: block;
  }
`
const TipsBody = styled.div`
  display: none;
  position: absolute;
  width: 436px;
  min-height: 220px;
  left: -150px;
  top: 20px;
  color: ${({ theme }) => theme.text2};
  background: ${({ theme }) => theme.bg8};
  border: 1px solid rgba(86, 90, 105, 0.3);
  box-sizing: border-box;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  cursor: default;
  padding: 20px 30px;
  max-width: 90vw;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      position: fixed;
      top: auto;
      left: auto;
      right: 10px;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    width: 90vw;
    position: fixed;
    top: auto;
    left: 5vw;
  `}
`

interface TV {
  text: string
}

export default function TipView({ text }: TV) {
  return (
    <TipsView>
      <span>?</span>
      <TipsBody>{text}</TipsBody>
    </TipsView>
  )
}
