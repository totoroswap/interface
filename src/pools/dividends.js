import { Contract } from 'ethers-multicall-x'
import { ERC20_ABI } from '../constants/abis/erc20'
import TotoroSwapFarmingRouter from '../constants/abis/TotoroSwapFarmingRouter.json'
import { getOnlyMultiCallProvider, getRpcUrl, getWeb3Contract, processResult } from '../constants/web3'
import { formatAmount } from '../utils/format'
import { ChainId, Token, WETH, Fetcher, Route } from '@totoroswap/sdk'

import { JsonRpcProvider } from '@ethersproject/providers'
import { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from '../constants'
BigNumber.config({ EXPONENTIAL_AT: 100 })

export const getPoolInfo = (pool, account, price) => {
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  const poolContract = new Contract(pool.address, pool.abi)
  const currencyToken = new Contract(pool.MLP, ERC20_ABI)
  const rewardsToken = new Contract(pool.rewards1Address, ERC20_ABI)
  const routerContract = new Contract(pool.routerAddress, TotoroSwapFarmingRouter)

  const promiseList = [
    poolContract.begin(), // 开始时间
    poolContract.totalSupply(), // 总抵押
    poolContract.APY(), // apy
    rewardsToken.balanceOf(pool.address), // 池子的余额
    routerContract.swapTaxs(ZERO_ADDRESS, pool.rewards1Address), // 全部税(手续费)
    poolContract.rewards(ZERO_ADDRESS) // 奖励未发放的量
  ]
  if (account) {
    promiseList.push(
      poolContract.earned(account), // 奖励1
      poolContract.balanceOf(account), // 我的抵押
      currencyToken.allowance(account, pool.address) // 是否授权
    )
  }
  return multicallProvider.all(promiseList).then(async data_ => {
    const data = processResult(data_)
    const [
      begin,
      totalSupply,
      APY = '0',
      poolBalanceOf,
      swapTaxs,
      rewards = 0,
      earned = 0,
      balanceOf = 0,
      allowance = 0
    ] = data
    const newPool = Object.assign({}, pool, {
      begin,
      totalSupply: formatAmount(totalSupply),
      earned,
      swapTaxs: formatAmount(new BigNumber(swapTaxs).multipliedBy(price).toString()),
      APY: Number(formatAmount(APY, 18, 4) * 100).toFixed(2),
      poolBalanceOf: formatAmount(poolBalanceOf),
      poolBalanceOfValue: formatAmount(new BigNumber(poolBalanceOf).multipliedBy(price), 18, 2),
      balanceOf: formatAmount(balanceOf, pool.mlpDecimal),
      allowance: allowance > 0,
      rewards: formatAmount(rewards),
      rewardsValue: formatAmount(new BigNumber(rewards).multipliedBy(price), 18, 2)
    })

    return newPool
  })
}
// Unit Price
export const useTokenPriceValue = poolData => {
  const [price, setPrice] = useState('0')
  useMemo(() => {
    const USDT = new Token(poolData.networkId, poolData.settleToken, poolData.settleTokenDecimal)
    const DAI = new Token(poolData.networkId, poolData.MLP, poolData.mlpDecimal)

    const provider = new JsonRpcProvider(getRpcUrl(DAI.chainId), DAI.chainId)
    Promise.all([
      Fetcher.fetchPairData(USDT, WETH[USDT.chainId], provider),
      Fetcher.fetchPairData(DAI, WETH[DAI.chainId], provider)
    ]).then(data => {
      try {
        const [USDCWETHPair, DAIUSDCPair] = data
        const route = new Route([USDCWETHPair, DAIUSDCPair], WETH[ChainId.OKT])
        const _price = route.midPrice.toSignificant(6)
        setPrice(_price)
      } catch {}
    })
  }, [])
  return price
}
// get Unit Price
export const getTokenPriceValue = poolData => {
  if (poolData.settleToken === poolData.MLP) {
    return '1'
  }
  const USDT = new Token(poolData.networkId, poolData.settleToken, poolData.settleTokenDecimal)
  const DAI = new Token(poolData.networkId, poolData.MLP, poolData.mlpDecimal)
  const provider = new JsonRpcProvider(getRpcUrl(DAI.chainId), DAI.chainId)
  return Promise.all([Fetcher.fetchPairData(DAI, USDT, provider)]).then(data => {
    const [pair] = data
    const route = new Route([pair], DAI, USDT)
    const _price = route.midPrice.toSignificant()
    return _price
  })
}

// 授权
export const onApproveContract = (library, account, contractAddress, approveAddress, callback) => {
  const contract = getWeb3Contract(library, ERC20_ABI, contractAddress) // mlp
  contract.methods
    .approve(approveAddress, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
    .send({
      from: account
    })
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}

// 领取奖励
export const onClaim = (library, address, abi, account, callback) => {
  const contract = getWeb3Contract(library, abi, address)
  contract.methods
    .getReward()
    .send({
      from: account
    })
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
// 取回
export const onExit = (library, account, abi, address, callback) => {
  const contract = getWeb3Contract(library, abi, address)
  contract.methods
    .exit()
    .send({
      from: account
    })
    .on('receipt', () => {
      callback(true)
    })
    .on('error', () => {
      callback(false)
    })
}
