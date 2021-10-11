import React, { useState } from 'react'
import { getWeb3Contract, useBalance } from '../../constants/web3/index'
import styled from 'styled-components'
import { ReactComponent as Close } from '../../assets/images/x.svg'

import Modal from '../Modal'
import { useActiveWeb3React } from '../../hooks'
import { numToWei } from '../../utils/format'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const UpperSection = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  min-height: 280px;
  box-sizing: border-box;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
`

const HoverText = styled.div`
  :hover {
    cursor: pointer;
  }
`
const ModalContentPD = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`
const ModalContent = styled.div`
  width: 100%;
  height: 100px;
  background: ${({theme})=>theme.bg8};
  border: 1px solid ${({theme})=>theme.bg8};
  box-sizing: border-box;
  border-radius: 20px;
`
const NameInputView = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 17px 14px 12px;
  box-sizing: border-box;
  overflow: hidden;
`
const NameTag = styled.div`
  padding: 7px 12px;
  font-size: 18px;
  background: ${({theme})=>theme.bg1};
  border: 0;
  color: ${({theme})=>theme.text1};
  border-radius: 16px;
  white-space: nowrap;
`
const ValueInputBox = styled.div`
  flex: 1;
  overflow: hidden;
`
const ValueInput = styled.input`
  height: 40px;
  background: transparent;
  border-color: transparent!important;
  width: 100%;
  color: ${({theme})=>theme.text1};
  text-align: right;
  font-size: 18px;
  :focus,:active,:focus-visible{
    border-color: transparent;
  }
  -webkit-appearance: textfield;

  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  outline: none;
`

const DescView = styled.div`
  font-size: 12px;
  line-height: 12px;
  color: ${({theme})=>theme.text1};
  padding-left: 20px;
`
const DescViewMax = styled.span`
  color: ${({theme})=>theme.text6};
  font-size: 12px;
  margin-left: 12px;
  cursor: pointer;
`
const FooterBtnGroup = styled.div`
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
`
const CancelBtn = styled.button`
  border-color: ${({theme})=>theme.text6};
  color: ${({theme})=>theme.text6};
  width: 214px;
  height: 48px;
  border-radius: 12px;
  background: transparent;
  margin-right: 12px;
  cursor: pointer;
`
const ConfigBtn = styled.button<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 214px;
  height: 48px;
  border: 0;
  color: ${({theme})=>theme.white};
  background: ${({theme, disabled}) => disabled ? theme.disabled : ('linear-gradient(90deg, ' + theme.gradual1 + ',' + theme.gradual2 + ')')};
  border-radius: 12px;
  cursor: pointer;
  :hover{
    opacity: 0.9;
  }
`

export default function FarmsActionModal({ isOpen, onClose, poolData, upUpdateNum }: any) {
  const { library, account } = useActiveWeb3React()
  const [inputValue, setInputValue] = useState('')
  const [stakeLoading, setStakeLoading] = useState(false)
  const balance = useBalance(poolData.MLP)
  if (!isOpen) {
    return null
  }
  const disabled = stakeLoading || !inputValue || isNaN(Number(inputValue)) || inputValue == '0'
  const onConfirm = () => {
    if (disabled) {
      return
    }
    setStakeLoading(true)
    const contract = getWeb3Contract(library, poolData.abi, poolData.address)
    contract.methods
      .stake(numToWei(`${inputValue}`, poolData.mlpDecimal))
      .send({
        from: account
      })
      .on('receipt', () => {
        upUpdateNum && upUpdateNum()
        setStakeLoading(false)
        onClose()
      })
      .on('error', () => {
        setStakeLoading(false)
      })
  }
  return (
    <Modal isOpen={isOpen} onDismiss={onClose} minHeight={false} maxHeight={90}>
      <UpperSection>
        <CloseIcon onClick={onClose}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <HoverText>Stake {poolData.coin} tokens</HoverText>
        </HeaderRow>
        <ModalContentPD>
          <ModalContent>
            <NameInputView>
              <NameTag>{poolData.coin}</NameTag>
              <ValueInputBox>
                <ValueInput placeholder="0.0" value={inputValue} onChange={e => setInputValue(e.target.value)}>
                </ValueInput>
              </ValueInputBox>
            </NameInputView>
            <DescView>
              {balance} {poolData.coin} Available
              <DescViewMax onClick={() => setInputValue(balance)}>(max)</DescViewMax>
            </DescView>
          </ModalContent>
        </ModalContentPD>
        <FooterBtnGroup>
          <CancelBtn onClick={onClose}>Cancel</CancelBtn>
          <ConfigBtn onClick={onConfirm} disabled={disabled}>
            {stakeLoading && <LoadingIcon />}
            Confirm
          </ConfigBtn>
        </FooterBtnGroup>
      </UpperSection>
    </Modal>
  )
}
