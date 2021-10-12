import USDTSvg from '../../assets/svg/pools/usdt.svg'
import WOKTSvg from '../../assets/svg/pools/okb.svg'
import BTCKSvg from '../../assets/svg/pools/btck.svg'
import USDT_OKB_SVG from '../../assets/svg/pools/usdt_okb.svg'
import OKB_IOS_SVG from '../../assets/svg/pools/okb_ios.svg'
import USDT_IOS_SVG from '../../assets/svg/pools/usdt_ios.svg'
import USDT_BTCK_SVG from '../../assets/svg/pools/usdt_btck.svg'
import BTCK_ETHK_SVG from '../../assets/svg/pools/btck_ethk.svg'
import TotoroSwapFarmingRouter from '../../constants/abis/TotoroSwapFarmingRouter.json'
import { USDT_ADDRESS, TOTORO_ADDRESS, OKB_ADDRESS, BTCK_ADDRESS, ETHK_ADDRESS } from '../../constants'
import { ChainId } from '@totoroswap/sdk'

export const tradeBonusConfig = [
  {
    title: 'USDT Pairs',
    icon: USDTSvg,
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#26A17B',
      dark: '#26A17B'
    },
    address: '0x4AD7f7a124a78E3e0d0eF9764022B9353B011D75',
    abi: TotoroSwapFarmingRouter,
    MLP: '0x382bb369d343125bfb2117af9c149795c6c65c50',
    mlpDecimal: 18,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    networkId: ChainId.BSC,
    decimals: 18,
    rewards1Address: TOTORO_ADDRESS // 单池奖励都是ios
  },
  {
    title: 'OKT Pairs',
    icon: WOKTSvg,
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#4494F7',
      dark: '#4494F7'
    },
    address: '0x4AD7f7a124a78E3e0d0eF9764022B9353B011D75',
    abi: TotoroSwapFarmingRouter,
    MLP: '0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15',
    mlpDecimal: 18,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    networkId: ChainId.BSC,
    decimals: 18,
    rewards1Address: TOTORO_ADDRESS // 单池奖励都是ios
  },
  {
    title: 'BTCK Pairs',
    icon: BTCKSvg,
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#F7931A',
      dark: '#F7931A'
    },
    address: '0x4AD7f7a124a78E3e0d0eF9764022B9353B011D75',
    abi: TotoroSwapFarmingRouter,
    MLP: '0x54e4622dc504176b3bb432dccaf504569699a7ff',
    mlpDecimal: 18,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    networkId: ChainId.BSC,
    decimals: 18,
    rewards1Address: TOTORO_ADDRESS // 单池奖励都是ios
  }
]

// 权重 WOKT BTCK USDT
export const recommendedPairs = [
  {
    title: 'USDT/OKT',
    icon: USDT_OKB_SVG,
    inputCurrency: USDT_ADDRESS,
    outputCurrency: 'OKT'
  },
  {
    title: 'OKB/IOS',
    icon: OKB_IOS_SVG,
    inputCurrency: OKB_ADDRESS,
    outputCurrency: TOTORO_ADDRESS
  },
  {
    title: 'USDT/IOS',
    icon: USDT_IOS_SVG,
    inputCurrency: USDT_ADDRESS,
    outputCurrency: TOTORO_ADDRESS
  },
  {
    title: 'USDT/BTCK',
    icon: USDT_BTCK_SVG,
    inputCurrency: USDT_ADDRESS,
    outputCurrency: BTCK_ADDRESS
  },
  {
    title: 'BTCK/ETHK',
    icon: BTCK_ETHK_SVG,
    inputCurrency: BTCK_ADDRESS,
    outputCurrency: ETHK_ADDRESS
  }
]
