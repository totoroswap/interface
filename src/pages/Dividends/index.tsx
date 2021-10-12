import React, { useState } from 'react'
import styled from 'styled-components'
import { poolsConfig } from './config'
import PoolsCard from '../../components/DividendsCard'
import TipView from '../../components/TipView'
import { toFormat } from '../../utils/format'

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
  background: ${({ theme }) => theme.bg1};
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
  `}
`

const PoolsBannerItem = styled(FlexCenter)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    justify-content: flex-start;
    border-top: 1px solid rgba(218, 227, 235, 0.3);
  `}
`
const PoolsBannerItemTitle = styled.div`
  color: ${({ theme }) => theme.text2};
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
  color: ${({ theme }) => theme.text1};
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
const poolMap: any = {}
export default function Dividends() {
  const [totalFees, setTotalFees] = useState('-')
  const [feesUnallocated, setFeesUnallocated] = useState('-')
  const [iOSStaked, setIOSStaked] = useState('-')

  const updateBannerData = (poolData: any) => {
    poolMap[poolData.address] = poolData
    const len = Object.keys(poolMap).length
    if (len === poolsConfig.length) {
      let totalFeesValue_ = 0
      let poolBalanceOf_ = 0
      let totalSupply_ = 0
      for (const i in poolMap) {
        const swapTaxs = Number(poolMap[i].swapTaxs)
        const poolBalanceOfValue = Number(poolMap[i].poolBalanceOfValue)
        if (!isNaN(swapTaxs)) {
          totalFeesValue_ += Number(swapTaxs)
        }
        if (!isNaN(poolBalanceOf_)) {
          poolBalanceOf_ += poolBalanceOfValue
        }
        const totalSupply = Number(poolMap[i].totalSupply)
        if (!isNaN(totalSupply)) {
          totalSupply_ += totalSupply
        }
      }
      setTotalFees(toFormat(totalFeesValue_.toFixed(2).toString()))
      setFeesUnallocated(toFormat(poolBalanceOf_.toFixed(2).toString()))
      setIOSStaked(toFormat(totalSupply_.toFixed(6).toString()))
    }
  }
  return (
    <PoolsPage>
      <PoolsTitle>
        Stake Your IOS to earn platform dividends.You can choose to get USDT, BNB or BTC.
        <TipView
          text="The transaction fee of the swaps on the TotoroSwap platform is 0.3%, and 100% transaction fee will be put into
            the dividend pools to reward the users staking IOS. Staking rewards are distributed in three forms by USDT
            pool, BNB pool and BTC pool. Users can choose to stake their IOS to three different pools to harvest
            rewards. The smart contract will automatically send 10% of the funds in the staking mining pool to users at
            correspondent ratio."
        />
      </PoolsTitle>
      <PoolsBanner>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Total Fees</PoolsBannerItemTitle>
            <PoolsBannerItemValue>${totalFees}</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>Fees Unallocated</PoolsBannerItemTitle>
            <PoolsBannerItemValue>${feesUnallocated}</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
        <PoolsBannerItem>
          <div>
            <PoolsBannerItemTitle>IOS Staked</PoolsBannerItemTitle>
            <PoolsBannerItemValue>{iOSStaked} IOS</PoolsBannerItemValue>
          </div>
        </PoolsBannerItem>
      </PoolsBanner>
      <PoolsCards>
        {poolsConfig.map((pool: any, index: number) => (
          <PoolsCard key={index} pool={pool} updateBannerData={updateBannerData} />
        ))}
      </PoolsCards>
    </PoolsPage>
  )
}
