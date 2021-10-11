import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Color } from '../../theme/styled'
import { useDarkModeManager } from '../../state/user/hooks'
import { FlexCenterH } from '../../pages/Dividends'
import { useBlockNumber } from '../../state/application/hooks'
import { useActiveWeb3React } from '../../hooks'
import { getTradeBonusInfo, getReward } from '../../pools/tradeBonus'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { formatTotalPrice } from '../../utils/format'
import { getTokenPriceValue } from '../../pools/pools'
import QuestionHelper from '../QuestionHelper'
import BigNumber from 'bignumber.js'
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
  height: 440px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 24px 0 20px 0;
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
  height: 64px;
`
const CardTitle = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 28px;
  margin-top: 12px;
  font-weight: 600;
`

const APYView = styled.button<{ themeColor: ThemeColor; isDark: boolean }>`
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({ isDark, themeColor }) => getThemeColor(themeColor, isDark)};
  color: ${({ isDark, themeColor }) => getThemeColor(themeColor, isDark)};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px auto 14px auto;
`
const EarnedName = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 16px;
`
const LineView = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
`
const LineViewAmount = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 20px;
`
const ClaimBtn = styled.button<{ disabled: boolean; themeColor: ThemeColor; isDark: boolean }>`
  width: 120px;
  height: 40px;
  border-radius: 12px;
  background: ${({ isDark, themeColor, disabled, theme }) =>
    disabled ? theme.disabled : getThemeColor(themeColor, isDark)};
  font-weight: 600;
  border: 0;
  color: ${({ theme }) => theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  :hover {
    opacity: 0.9;
  }
`

const LineViewText = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.text2};
  flex: 1;
  display: flex;
  align-content: center;
`
const LineViewValue = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  flex: 1;
  text-align: right;
  color: ${({ theme }) => theme.text1};
  white-space: nowrap;
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
const QuestionHelperB = styled.span<{ themeColor: ThemeColor; isDark: boolean }>`
  line-height: 0;
  div {
    color: ${({ themeColor, isDark }) => getThemeColor(themeColor, isDark)};
    background: transparent !important;
  }
`
export default function PoolsCard({ pool, updateBannerData }: any) {
  const [poolInfo, setPoolInfo] = useState(pool)
  const { account, library } = useActiveWeb3React()
  const [isDark] = useDarkModeManager()
  const blockNumber = useBlockNumber()
  const [claimLoading, setClaimLoading] = useState(false)
  const [loadLoading, setLoadLoading] = useState(true)
  const getTradeBonusInfo_ = async () => {
    if (account) {
      const price = await getTokenPriceValue(pool)
      getTradeBonusInfo(pool, account, price).then((resPool: any) => {
        const newPoolData = {
          ...resPool,
          swapAmountsTotalValue: formatTotalPrice(resPool.swapAmountsTotal, price, 2),
          swapAmountsValue: formatTotalPrice(resPool.swapAmounts, price, 2),
          PETotal: new BigNumber(resPool.paidTotal).plus(resPool.earnedTotal).toString()
        }
        console.log('newPoolData', newPoolData)
        updateBannerData(newPoolData)
        setPoolInfo(newPoolData)
        setLoadLoading(false)
      })
    }
  }
  useMemo(() => {
    getTradeBonusInfo_()
  }, [account, blockNumber])

  const onClaim = () => {
    if (!account || poolInfo.earned <= 0) {
      return
    }
    setClaimLoading(true)
    getReward(account, library, poolInfo.MLP, poolInfo.abi, poolInfo.address, (success: boolean) => {
      setClaimLoading(false)
      success && getTradeBonusInfo_()
    })
  }
  return (
    <CardView>
      <CardLoading visible={loadLoading} />
      <PaddingLR>
        <CardIcon src={poolInfo.icon} />
        <CardTitle>{poolInfo.title}</CardTitle>
        <APYView themeColor={poolInfo.themeColor} isDark={isDark}>
          Bonus Ratio： {poolInfo.bonusRatio} IOS
          <QuestionHelperB themeColor={poolInfo.themeColor} isDark={isDark}>
            <QuestionHelper text="The IOS expected to get for every 1000U transaction" />
          </QuestionHelperB>
        </APYView>
        <EarnedName>{poolInfo.earnedName}</EarnedName>
        <LineView>
          <LineViewAmount>{poolInfo.earned}</LineViewAmount>
          <FlexCenterH>
            <ClaimBtn
              disabled={poolInfo.earned <= 0 || !poolInfo.earned}
              themeColor={poolInfo.themeColor}
              isDark={isDark}
              onClick={onClaim}
            >
              {claimLoading && <LoadingIcon />}
              Claim
            </ClaimBtn>
          </FlexCenterH>
        </LineView>
      </PaddingLR>
      <CardFooter>
        <PaddingLR>
          <CardFooterLine>
            <LineView>
              <LineViewText>Total Volume</LineViewText>
              <LineViewValue>
                {poolInfo.swapAmountsTotal} (${poolInfo.swapAmountsTotalValue})
              </LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>Bonus Allocated</LineViewText>
              <LineViewValue>{poolInfo.PETotal} IOS</LineViewValue>
            </LineView>
          </CardFooterLine>
          <CardFooterLine>
            <LineView>
              <LineViewText>My Volume</LineViewText>
              <LineViewValue>
                {poolInfo.swapAmounts} (${poolInfo.swapAmountsValue})
              </LineViewValue>
            </LineView>
          </CardFooterLine>
        </PaddingLR>
      </CardFooter>
    </CardView>
  )
}
