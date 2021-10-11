import React, { useState } from 'react'
import styled from 'styled-components'
import { tradeBonusConfig, recommendedPairs } from './config'
import TipView from '../../components/TipView'
import TradeBonusCard from '../../components/TradeBonusCard'
import { toFormat } from '../../utils/format'
import { Link } from 'react-router-dom'

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const FlexCenterH = styled.div`
  display: flex;
  align-items: center;
`

const PoolsPage = styled.div`
  width: 1020px;
  max-width: 1020px;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 100%;
  max-width: 728px;
  padding-bottom: 20px;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  width: 100%;
  max-width: 100%;
  `}
`
const PoolsTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text1};
`
const PoolsBanner = styled.div`
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual10} 0%, ${({ theme }) => theme.gradual11} 100%);
  color: ${({ theme }) => theme.text1};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  min-height: 110px;
  border-radius: 12px;
  padding: 0 20px 20px 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr 1fr;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    grid-template-columns: 1fr;
    padding-bottom: 0;
  `}
`

const PoolsBannerItem = styled(FlexCenter)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-start;
    border-top: 1px solid rgba(218, 227, 235, 0.3);
  `}
`
const PoolsBannerItemTitle = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  margin-top: 20px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     font-size: 14px;
     margin-top: 12px;
  `}
`
const PoolsBannerItemValue = styled.div`
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: 26px;
  line-height: 36px;
  margin-top: 12px;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
     font-size: 22px;
     margin: 6px 0 12px 0;
  `}
`

const PoolsCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      grid-template-columns: 1fr 1fr;
      justify-items: center;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      grid-template-columns: 1fr;
      justify-items: center;
  `}
`
const RecommendedPairsTitle = styled(PoolsTitle)`
  margin: 30px 0 20px 0;
`
const RecommendedPairs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 10px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
      grid-template-columns: 1fr 1fr 1fr;
      justify-items: center;
  `}
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      grid-template-columns: 1fr 1fr;
      justify-items: center;
  `}
`
const RecommendedPair = styled.div`
  width: 192px;
  height: 200px;
  padding: 32px 26px;
  margin-top: 20px;
  background: ${({ theme }) => theme.bg1};
  text-align: center;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  img {
    height: 36px;
  }
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      width: calc((100vw - 32px - 14px) / 2);
      margin-top: 12px;
      padding: 24px 0 20px 14;
  `}
`
const RecommendedPairTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  margin: 10px 0 20px 0;
`
const RecommendedPairButton = styled.button`
  display: inline-block;
  border: 0;
  width: 140px;
  height: 42px;
  line-height: 42px;
  text-decoration: none;
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual3} 0%, ${({ theme }) => theme.gradual4} 100%);
  color: ${({ theme }) => theme.primary1};
  border-radius: 12px;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      width: 100%;
      font-size: 14px;
  `}
`

const poolMap: any = {}
export default function Dividends() {
  const [totalVolume, setTotalVolume] = useState('-')
  const [bonusAllocated, setBonusAllocated] = useState('-')
  const [myTotalBonus, setMyTotalBonus] = useState('-')

  const updateBannerData = (poolData: any) => {
    poolMap[poolData.address + poolData.MLP] = poolData
    const len = Object.keys(poolMap).length
    if (len === tradeBonusConfig.length) {
      let totalVolume_ = 0
      let bonusAllocated_ = 0
      let myTotalBonus_ = 0
      for (const i in poolMap) {
        const swapAmountsTotalValue = Number(poolMap[i].swapAmountsTotalValue)
        if (!isNaN(swapAmountsTotalValue)) {
          totalVolume_ += swapAmountsTotalValue
        }
        const paidTotal = Number(poolMap[i].paidTotal)
        const earnedTotal = Number(poolMap[i].earnedTotal)
        if (!isNaN(paidTotal) && !isNaN(earnedTotal)) {
          bonusAllocated_ += paidTotal + earnedTotal
        }
        const paid = Number(poolMap[i].paid)
        const earned = Number(poolMap[i].earned)
        if (!isNaN(paid) && !isNaN(earned)) {
          myTotalBonus_ += paid + earned
        }
      }
      setTotalVolume(toFormat(String(totalVolume_ === 0 ? 0 : totalVolume_.toFixed(2))))
      setBonusAllocated(toFormat(String(bonusAllocated_ === 0 ? 0 : bonusAllocated_.toFixed(6))))
      setMyTotalBonus(toFormat(String(myTotalBonus_ === 0 ? 0 : myTotalBonus_.toFixed(6))))
    }
  }
  return (
    <PoolsPage>
      <PoolsTitle>
        Trade with USDT, OKT, or BTCK to earn IOS
        <TipView text="In order to encourage users to trade, TotoroSwap sets up transaction mining rewards for trading pairs containing USDT, OKT and BTCK. All trading pairs that include these three assets in the user's transaction can receive transaction mining rewards. Transaction mining rewards are issued in the form of platform token IOS, which is issued according to the proportion of user transaction volume to the total transaction volume of the platform. " />
      </PoolsTitle>
      <PoolsBanner>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Total Volume</PoolsBannerItemTitle>
            <PoolsBannerItemValue>${totalVolume}</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Bonus Allocated</PoolsBannerItemTitle>
            <PoolsBannerItemValue>{bonusAllocated} IOS</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>My Total Bonus</PoolsBannerItemTitle>
            <PoolsBannerItemValue>{myTotalBonus} IOS</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
      </PoolsBanner>
      <PoolsCards>
        {tradeBonusConfig.map((pool: any, index: number) => (
          <TradeBonusCard key={index} pool={pool} updateBannerData={updateBannerData} />
        ))}
      </PoolsCards>
      <RecommendedPairsTitle>Recommended Pairs</RecommendedPairsTitle>
      <RecommendedPairs>
        {recommendedPairs.map((item: any, index: number) => (
          <RecommendedPair key={index}>
            <img src={item.icon} alt="" />
            <RecommendedPairTitle>{item.title}</RecommendedPairTitle>
            <RecommendedPairButton
              as={Link}
              to={`/swap?inputCurrency=${item.inputCurrency}&outputCurrency=${item.outputCurrency}`}
            >
              Trade Now
            </RecommendedPairButton>
          </RecommendedPair>
        ))}
      </RecommendedPairs>
    </PoolsPage>
  )
}
