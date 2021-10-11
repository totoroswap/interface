import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { FlexCenterH } from '../../pages/Farms'
import { useDarkModeManager } from '../../state/user/hooks'
import { useActiveWeb3React } from '../../hooks'
import { getPoolInfo, onApproveContract, onClaim, onExit } from '../../pools/pools'
import { formatAmount, formatTotalPrice } from '../../utils/format'
import PoolsActionModal from '../FarmsActionModal'
import { useBlockNumber } from '../../state/application/hooks'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { getAprLP } from '../../pools/apr'
import ArrowSvg from '../../assets/svg/pools/arrow.svg'
import { ExternalLink } from '../../theme'
import { Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import CardLoading from '../CardLoading'

const CardView = styled.div`
  position: relative;
  background: ${({ theme }) => theme.bg1};
  margin-top: 20px;
  width: 330px;
  height: 466px;
  box-shadow: 0px 10px 30px rgba(30, 68, 89, 0.12);
  border-radius: 12px;
  padding: 24px 0 16px 0;
  max-width: calc(100vw - 32px);
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      width: 100%;
      margin-top: 0px;
      margin-bottom: 10px;
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

const APYView = styled.button`
  background: transparent;
  display: block;
  height: 42px;
  padding: 10px 38px;
  border: 1px solid ${({ theme }) => theme.primary1};
  color: ${({ theme }) => theme.primary1};
  box-sizing: border-box;
  border-radius: 12px;
  margin: 20px auto 22px auto;
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
  margin: 12px 0 6px 0;
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
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  color: ${({ theme }) => theme.white};
  background: linear-gradient(
    90deg,
    ${({ theme, disabled }) => (disabled ? theme.disabled : theme.gradual1)},
    ${({ theme, disabled }) => (disabled ? theme.disabled : theme.gradual2)}
  );

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
  color: ${({ theme }) => theme.white};
  background: linear-gradient(90deg, ${({ theme }) => theme.gradual1}, ${({ theme }) => theme.gradual2});
  border-radius: 12px;

  :hover {
    opacity: 0.9;
  }
`
const StakeButton = styled(ApprovalButton)`
  margin: 0 0 0 6px;
  width: 80px;
  font-weight: 400;
  font-size: 30px;
  background: transparent;
  color: ${({ theme, disabled }) => (disabled ? theme.disabled : theme.primary1)};
  border: 1px solid ${({ theme, disabled }) => (disabled ? theme.disabled : theme.primary1)};
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
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  color: ${({ theme }) => theme.text2};
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
const LinkArrowBox = styled(ExternalLink)`
  cursor: pointer;
  border-bottom: 1px solid transparent;

  text-decoration: none !important;
  :hover {
    text-decoration: none !important;
    border-bottom: 1px solid #cccccc;
  }
`
const LinkArrow = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.bg11};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;
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

  // 矿池所有的LPT总价值 = (矿池的总质押(totalSupply) / LPT总发行(LPT.totalSupply)) * LPT含有token0 或 token1的量(LPT.getReserves) * 2 * 转为USDC的价值(price)
  const [apr, setApr] = useState('-')

  const upUpdateNum = () => {
    setUpdateNum(updateNum + 1)
  }
  const blockNumber = useBlockNumber()
  useMemo(() => {
    if (account) {
      getPoolInfo(pool, account).then(resPool => {
        getAprLP(resPool).then(data => {
          setApr(data.apr)
          const newPoolData = {
            ...resPool,
            totalSupplyValue: formatTotalPrice(resPool.totalSupply, data.price, 2),
            LPTValue: new BigNumber(data.value).toFixed(2).toString()
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
          <APYView> APY：{apr}% </APYView>
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
                Harvest
              </ClaimBtn>
            </FlexCenterH>
          </LineView>
          <EarnedName>{poolData.coin}</EarnedName>
          {poolData.allowance ? (
            <LineView>
              <LineViewAmount>{poolData.balanceOf}</LineViewAmount>
              <FlexCenterH>
                <StakeButton
                  disabled={Number(poolData.balanceOf) <= 0 || !poolData.balanceOf}
                  themeColor={poolData.themeColor}
                  isDark={isDark}
                  onClick={onExit_}
                >
                  {exitLoading && <LoadingIcon />}-
                </StakeButton>
                <StakeButton themeColor={poolData.themeColor} isDark={isDark} onClick={() => setIsOpen(true)}>
                  +
                </StakeButton>
              </FlexCenterH>
            </LineView>
          ) : (
            <ApprovalButton
              themeColor={poolData.themeColor}
              isDark={isDark}
              approveLoading={approveLoading}
              onClick={onApprove}
            >
              {approveLoading && <LoadingIcon />}
              Approve Contract
            </ApprovalButton>
          )}
        </PaddingLR>
        <CardFooter>
          <PaddingLR>
            <CardFooterLine>
              <LineView>
                <LineViewText>Stake</LineViewText>
                <LinkArrowBox
                  as={Link}
                  to={`/add/${poolData.stakeAddress0 || poolData.address0}/${poolData.stakeAddress1 ||
                    poolData.address1}`}
                >
                  <LineViewValue>
                    <span>{poolData.coin.replace('/', '-')}</span>
                    <LinkArrow>
                      <img src={ArrowSvg} alt="" />
                    </LinkArrow>
                  </LineViewValue>
                </LinkArrowBox>
              </LineView>
            </CardFooterLine>
            <CardFooterLine>
              <LineView>
                <LineViewText>Total Deposited</LineViewText>
                <LineViewValue>
                  {poolData.totalSupply}(${poolData.LPTValue})
                </LineViewValue>
              </LineView>
            </CardFooterLine>
          </PaddingLR>
        </CardFooter>
      </CardView>
    </>
  )
}
