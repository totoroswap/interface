import OKTSvg from '../../assets/svg/pools/okt_d.svg'
import { BTCK_ADDRESS, TOTORO_ADDRESS, USDT_ADDRESS, WOKT_ADDRESS } from '../../constants'
import USDTSvg from '../../assets/svg/pools/usdt_d.svg'
import BTCSvg from '../../assets/svg/pools/btc_d.svg'
import StakingPool from '../../constants/abis/StakingPool.json'
import { ChainId } from '@totoroswap/sdk'

export const poolsConfig = [
  {
    title: 'WOKT Dividend',
    icon: OKTSvg,
    coin: 'IOS',
    earnedName: 'WOKT EARNED',
    themeColor: {
      light: '#4494F7',
      dark: '#4494F7'
    },
    address: '0x4da241FA73e8F009a443cBFE27A3901e432616Ea',
    abi: StakingPool,
    MLP: TOTORO_ADDRESS, // 质押
    mlpDecimal: 18,
    rewards1Address: WOKT_ADDRESS, // 得到
    networkId: ChainId.OKT,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    routerAddress: '0x4AD7f7a124a78E3e0d0eF9764022B9353B011D75' // router合约
  },
  {
    title: 'BTCK Dividend',
    icon: BTCSvg,
    coin: 'IOS',
    earnedName: 'BTCK EARNED',
    themeColor: {
      light: '#F7931A',
      dark: '#F7931A'
    },
    address: '0x5e84b777f7b00139fd4bde0d76f20fcbd51d3a72',
    abi: StakingPool,
    MLP: TOTORO_ADDRESS, // 质押
    mlpDecimal: 18,
    rewards1Address: BTCK_ADDRESS, // 得到
    networkId: ChainId.OKT,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    routerAddress: '0x4AD7f7a124a78E3e0d0eF9764022B9353B011D75' // router合约
  },
  {
    title: 'USDT Dividend',
    icon: USDTSvg,
    coin: 'IOS',
    earnedName: 'USDT EARNED',
    themeColor: {
      light: '#26A17B',
      dark: '#26A17B'
    },
    address: '0x096fb80c7654712738caaca2b332a0246247e78d',
    abi: StakingPool,
    MLP: TOTORO_ADDRESS, // 质押
    mlpDecimal: 18,
    rewards1Address: USDT_ADDRESS, // 得到
    networkId: ChainId.OKT,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18,
    routerAddress: '0x4AD7f7a124a78E3e0d0eF9764022B9353B011D75' // router合约
  }
]
