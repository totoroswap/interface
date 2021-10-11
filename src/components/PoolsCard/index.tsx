import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FlexCenterH } from '../../pages/Farms'
import { Color } from '../../theme/styled'
import { useDarkModeManager } from '../../state/user/hooks'
import { useActiveWeb3React } from '../../hooks'
import { getPoolInfo, onApproveContract, onClaim, onExit } from '../../pools/pools'
import { formatAmount, formatTotalPrice } from '../../utils/format'
import PoolsActionModal from '../FarmsActionModal'
import { useBlockNumber } from '../../state/application/hooks'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { getAprSingle } from '../../pools/apr'
import { FlexCenter } from '../../pages/Pools'
import CardLoading from '../CardLoading'

interface ThemeColor {
  light: Color
  dark: Color
}

const getThemeColor = (themeColor: ThemeColor, isDark: boolean) => {
  return isDark ? themeColor.dark : themeColor.light
}
const CardView = styled.div`
  position: relative;
  background: ${({ theme }) => theme.bg1};
  margin-top: 20px;
  width: 330px;
  height: 466px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 24px 0 16px 0;
  box-sizing: border-box;
  max-width: calc(100vw - 32px);
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      width: 100%;
      margin-top: 0;
      margin-bottom: 12px
  `}
`
const CardIcon = styled.img`
  display: block;
  margin: 6px auto;
  width: 64px;
`
const CardTitle = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text1};
  font-size: 20px;
  line-height: 28px;
  margin-top: 12px;
  font-weight: 600;
`

const APYView = styled.button<{ themeColor: ThemeColor; isDark: boolean }>`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({ themeColor, isDark }) => getThemeColor(themeColor, isDark)};
  color: ${({ themeColor, isDark }) => getThemeColor(themeColor, isDark)};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px auto 14px auto;
`
const EarnedName = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
  color: ${({ theme }) => theme.text2};
`
const LineView = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text1};
  margin: 8px 0;
`
const LineViewAmount = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 20px;
`
const ClaimBtn = styled.button<any>`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  align-items: center;
  justify-content: center;
  border: 0;
  color: ${({ theme }) => theme.white};
  background: ${({ themeColor, isDark, disabled, theme }) =>
    disabled ? theme.disabled : getThemeColor(themeColor, isDark)};

  :hover {
    opacity: 0.9;
  }
`

const ApprovalButton = styled.div<any>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  font-weight: 600;
  margin-top: 20px;
  cursor: pointer;

  color: ${({ themeColor, isDark }) => getThemeColor(themeColor, isDark)};
  border: 1px solid ${({ themeColor, isDark }) => getThemeColor(themeColor, isDark)};
  background: transparent;
  border-radius: 12px;

  :hover {
    opacity: 0.9;
  }
`
const StakeButton = styled(ApprovalButton)`
  margin-top: 12px;
  width: 146px;
  font-weight: 400;
  font-size: 30px;
`
const LineViewText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
  flex: 1;
  display: flex;
  align-content: center;
`
const LineViewValue = styled(FlexCenterH)`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  ${({ theme }) => theme.text2}
`
const CardFooter = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border1};
  padding-top: 4px;
  margin-top: 20px;
`

const CardFooterLine = styled.div`
  margin-top: 16px;

  span {
    color: ${({ theme }) => theme.text2};
    font-weight: 600;
  }
`

const PaddingLR = styled.div`
  padding: 0 16px;
`
const ExitButton = styled.div<any>`
  width: 146px;
  height: 40px;
  border-radius: 12px;
  margin-right: 6px;
  margin-top: 12px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: 600;
  color: ${({ themeColor, isDark, disabled, theme }) =>
    disabled ? theme.disabled : getThemeColor(themeColor, isDark)};
  border: 1px solid
    ${({ themeColor, isDark, disabled, theme }) => (disabled ? theme.disabled : getThemeColor(themeColor, isDark))};
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`

export default function PoolsCard({ pool, updateBannerData }: any) {
  const { account, library } = useActiveWeb3React()
  const [isDark] = useDarkModeManager()
  const [poolData, setPoolData] = useState(pool)
  const [isOpen, setIsOpen] = useState(false)
  const [approveLoading, setApproveLoading] = useState(false)
  const [claimLoading, setClaimLoading] = useState(false)
  const [updateNum, setUpdateNum] = useState(0)
  const [loadLoading, setLoadLoading] = useState(true)
  const [exitLoading, setExitLoading] = useState(false)

  const [apr, setApr] = useState('-')

  const upUpdateNum = () => {
    setUpdateNum(updateNum + 1)
  }
  const blockNumber = useBlockNumber()
  useMemo(() => {
    if (account) {
      getPoolInfo(pool, account).then(resPool => {
        getAprSingle(resPool).then(data => {
          setApr(data.apr)
          const newPoolData = {
            ...resPool,
            balanceOfValue: formatTotalPrice(resPool.balanceOf, data.price, 2),
            totalSupplyValue: formatTotalPrice(resPool.totalSupply, data.price, 2)
          }
          setPoolData(newPoolData)
          updateBannerData(newPoolData)
          setLoadLoading(false)
        })
      })
    }
  }, [account, blockNumber, updateNum])
  const onApprove = () => {
    if (approveLoading || !account) {
      return
    }
    setApproveLoading(true)
    onApproveContract(library, account, poolData.MLP, poolData.address, (res: boolean) => {
      setApproveLoading(false)
      if (res) {
        upUpdateNum()
        console.log('success')
      } else {
        console.log('fail')
      }
    })
  }
  const onClaim_ = () => {
    if (claimLoading || poolData.earned == '0' || !account) {
      return
    }
    setClaimLoading(true)
    onClaim(library, poolData.address, poolData.abi, account, (succcess: boolean) => {
      setClaimLoading(false)
      upUpdateNum()
      if (succcess) {
      } else {
      }
    })
  }
  const onExit_ = () => {
    if (poolData.balanceOf <= 0 || exitLoading || !account) {
      return
    }
    setExitLoading(true)
    onExit(library, account, poolData.abi, poolData.address, (succcess: boolean) => {
      setExitLoading(false)
      upUpdateNum()
      if (succcess) {
      } else {
      }
    })
  }

  return (
    <>
      <PoolsActionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        poolData={poolData}
        upUpdateNum={upUpdateNum}
      />
      <CardView>
        <CardLoading visible={loadLoading} />
        <PaddingLR>
          <CardIcon src={poolData.icon} />
          <CardTitle>{poolData.title}</CardTitle>
          <APYView themeColor={poolData.themeColor} isDark={isDark}>
            {' '}
            APY：{apr}%{' '}
          </APYView>
          <EarnedName>{poolData.earnedName}</EarnedName>
          <LineView>
            <LineViewAmount>{formatAmount(poolData.earned || '0').toString()}</LineViewAmount>
            <FlexCenterH>
              <ClaimBtn
                disabled={Number(poolData.earned) <= 0 || !poolData.earned}
                themeColor={poolData.themeColor}
                isDark={isDark}
                onClick={onClaim_}
              >
                {claimLoading && <LoadingIcon />}
                Claim
              </ClaimBtn>
            </FlexCenterH>
          </LineView>
          {poolData.allowance ? (
            <FlexCenter>
              <ExitButton
                disabled={Number(poolData.balanceOf) <= 0 || !poolData.balanceOf}
                themeColor={poolData.themeColor}
                isDark={isDark}
                onClick={onExit_}
              >
                {exitLoading && <LoadingIcon size={18} />}
                Withdraw {poolData.coin}
              </ExitButton>
              <StakeButton themeColor={poolData.themeColor} isDark={isDark} onClick={() => setIsOpen(true)}>
                +
              </StakeButton>
            </FlexCenter>
          ) : (
            <ApprovalButton
              themeColor={poolData.themeColor}
              isDark={isDark}
              approveLoading={approveLoading}
              onClick={onApprove}
            >
              {approveLoading && <LoadingIcon />}
              Approve {poolData.coin}
            </ApprovalButton>
          )}
        </PaddingLR>
        <CardFooter>
          <PaddingLR>
            <CardFooterLine>
              <LineView>
                <LineViewText>Your Deposited</LineViewText>
                <LineViewValue>
                  {poolData.balanceOf}(${poolData.balanceOfValue})
                </LineViewValue>
              </LineView>
            </CardFooterLine>
            <CardFooterLine>
              <LineView>
                <LineViewText>Total Deposited</LineViewText>
                <LineViewValue>
                  {poolData.totalSupply}(${poolData.totalSupplyValue})
                </LineViewValue>
              </LineView>
            </CardFooterLine>
          </PaddingLR>
        </CardFooter>
      </CardView>
    </>
  )
}
