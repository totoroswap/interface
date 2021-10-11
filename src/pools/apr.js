import Web3 from 'web3'
import { getOnlyMultiCallProvider, getRpcUrl, processResult } from '../constants/web3'
import { ERC20_ABI } from '../constants/abis/erc20'
import LPT from '../constants/abis/LPT.json'
import { Contract } from 'ethers-multicall-x'
import BigNumber from 'bignumber.js'
import { getTokenPriceValue } from './pools'
import { ZERO_ADDRESS } from '../constants'
import { formatAmount } from '../utils/format'

export const getSpan = poolData => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(poolData.networkId)))
  const contract = new web3.eth.Contract(poolData.abi, poolData.address)
  return contract.methods
    .rewardsDuration()
    .call()
    .then(_span => {
      return new BigNumber(_span)
    })
}

const createContractERC20 = (chainId, address) => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(chainId)))
  return new web3.eth.Contract(ERC20_ABI, address) // WAR_ADDRESS(chainId)
}
// 池子在矿山授权的额度
export const getAllowance = poolData => {
  const contract = createContractERC20(poolData.networkId, poolData.rewards1Address)
  return contract.methods
    .allowance(poolData.mineMountainAddress, poolData.address)
    .call()
    .then(res => {
      return new BigNumber(res)
    })
}
// 矿池总的LPT的价值
export const getLptValue = (poolData, price) => {
  const contract = new Contract(poolData.MLP, LPT)
  const promiseList = [contract.token0(), contract.token1(), contract.getReserves(), contract.totalSupply()]
  const multicallProvider = getOnlyMultiCallProvider(poolData.networkId)
  return multicallProvider
    .all(promiseList)
    .then(data_ => {
      const data = processResult(data_)
      const [token0Address, token1Address, [reserve0, reserve1], totalSupply] = data
      if (poolData.address0.toLowerCase() === token0Address.toLowerCase()) {
        return new BigNumber(reserve0)
          .multipliedBy(new BigNumber(2))
          .multipliedBy(new BigNumber(poolData.totalSupply_).div(new BigNumber(totalSupply)))
          .multipliedBy(price)
      }
      if (poolData.address0.toLowerCase() === token1Address.toLowerCase()) {
        return new BigNumber(reserve1)
          .multipliedBy(new BigNumber(2))
          .multipliedBy(new BigNumber(poolData.totalSupply_).div(new BigNumber(totalSupply)))
          .multipliedBy(price)
      }
      return new BigNumber(0)
    })
    .catch(() => {
      return new BigNumber(0)
    })
}

export const getTotalRewards = miningPools => {
  const web3 = new Web3(new Web3.providers.HttpProvider(getRpcUrl(miningPools.networkId)))
  const contract = new web3.eth.Contract(miningPools.abi, miningPools.address)
  return contract.methods
    .rewards(ZERO_ADDRESS)
    .call()
    .then(totalRewards => totalRewards)
}

// Single
export const getAprSingle = async poolData => {
  const [span, allowance] = await Promise.all([getSpan(poolData), getAllowance(poolData)])
  const price = await getTokenPriceValue({
    ...poolData,
    MLP: poolData.rewards1Address
  })
  const price2 = await getTokenPriceValue(poolData)
  const apr = allowance
    .multipliedBy(
      new BigNumber(1)
        .div(span.div(86400))
        .multipliedBy(365)
        .multipliedBy(price)
    )
    .div(
      new BigNumber(poolData.totalSupply).multipliedBy(new BigNumber(10).pow(poolData.mlpDecimal)).multipliedBy(price2)
    )
    .multipliedBy(100)
    .toFixed(2, 1)
    .toString()
  return {
    apr,
    price: price2
  }
}
// LP
export const getAprLP = async poolData => {
  const price2 = await getTokenPriceValue({
    ...poolData,
    MLP: poolData.address0
  })
  const [span, allowance, unClaimReward, LPTValue, price] = await Promise.all([
    getSpan(poolData),
    getAllowance(poolData),
    getTotalRewards(poolData), // 获取奖励1未发放的量
    getLptValue(poolData, price2),
    getTokenPriceValue({
      ...poolData,
      MLP: poolData.rewards1Address
    })
  ])
  if (isNaN(LPTValue) || LPTValue.toString() === '0') {
    return {
      apr: 'infinity',
      price: '0',
      value: '0'
    }
  }

  const reward1Vol = new BigNumber(allowance).minus(new BigNumber(unClaimReward)).toString()
  const rewardsTotalValue = new BigNumber(price).multipliedBy(new BigNumber(reward1Vol)).toString()

  const startAt = poolData.begin
  const now = parseInt(new Date().getTime() / 1000)
  const dayRate = new BigNumber(1).div(new BigNumber(Number(startAt) + Number(span) - now).div(new BigNumber(86400)))

  const yearReward = dayRate
    .multipliedBy(new BigNumber(rewardsTotalValue))
    .multipliedBy(new BigNumber(365))
    .toFixed(0, 1)
  let apr = '0'
  if (yearReward > 0) {
    const _arp = new BigNumber(yearReward)
      .div(new BigNumber(LPTValue))
      .toFixed(2)
      .toString()
    apr = _arp
  }

  return {
    apr,
    price: price2 * 2,
    value: formatAmount(LPTValue.toString(), poolData.mlpDecimal)
  }
}
