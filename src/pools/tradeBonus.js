import { getOnlyMultiCallProvider, getWeb3Contract, processResult } from '../constants/web3'
import { Contract } from 'ethers-multicall-x'
import { ZERO_ADDRESS } from '../constants'
import { formatAmount, numToWei } from '../utils/format'

export const getTradeBonusInfo = (pool, account, price) => {
  const multicallProvider = getOnlyMultiCallProvider(pool.networkId)
  const poolContract = new Contract(pool.address, pool.abi)

  const promiseList = [
    poolContract.swapAmounts(ZERO_ADDRESS, pool.MLP), // 总交易额
    poolContract.paid(ZERO_ADDRESS, pool.MLP), // 全网已领取
    poolContract.earned(account, pool.MLP), // 全网待奖励
    poolContract.swapAmounts(account, pool.MLP), // 用户交易额
    poolContract.swapTaxs(account, pool.MLP), // 交易税
    poolContract.paid(account, pool.MLP), //已领取奖励
    poolContract.earned(account, pool.MLP), // 待领取奖励
    poolContract.swapFarmingable(pool.MLP, numToWei(1000 / price)) // 1000U 对应池子币的数量
  ]
  return multicallProvider.all(promiseList).then(data_ => {
    const [swapAmountsTotal, paidTotal, earnedTotal, swapAmounts, swapTaxs, paid, earned, bonusRatio] = processResult(
      data_
    )
    return Object.assign({}, pool, {
      swapAmountsTotal: formatAmount(swapAmountsTotal),
      paidTotal: formatAmount(paidTotal),
      earnedTotal: formatAmount(earnedTotal),
      swapAmounts: formatAmount(swapAmounts),
      swapTaxs: formatAmount(swapTaxs),
      paid: formatAmount(paid),
      earned: formatAmount(earned),
      bonusRatio: formatAmount(bonusRatio)
    })
  })
}
export const getReward = (account, library, MLP, abi, contractAddress, callback) => {
  const contract = getWeb3Contract(library, abi, contractAddress)
  contract.methods
    .getReward(MLP)
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
