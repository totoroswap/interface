import IOSSvg from '../../assets/svg/pools/ios.svg'
import USDTSvg from '../../assets/svg/pools/usdt.svg'
import OKBSvg from '../../assets/svg/pools/okb.svg'
import BTCKSvg from '../../assets/svg/pools/btck.svg'
import ETHSvg from '../../assets/svg/pools/eth.svg'
import IOSPoolsAbi from '../../constants/abis/IOSPools.json'
import { IOS_ADDRESS, USDT_ADDRESS } from '../../constants'
import { ChainId } from '@totoroswap/sdk'

export const poolsConfig = [
  {
    title: 'IOS Pool',
    icon: IOSSvg,
    coin: 'IOS',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#3285FF',
      dark: '#2172E5'
    },
    address: '0xF8b37Bb3C9559A070664530778529d6F4A01Ed6E',
    MLP: IOS_ADDRESS, // 质押的资产
    mlpDecimal: 18,
    rewards1Address: IOS_ADDRESS, // 单池奖励都是ios
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT Pool',
    icon: USDTSvg,
    coin: 'USDT',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#26A17B',
      dark: '#17614a'
    },
    address: '0x994bb05D12Ef35F65C235Bf8e151E7F5E26aF19f',
    MLP: USDT_ADDRESS,
    mlpDecimal: 18,
    rewards1Address: IOS_ADDRESS, // 单池奖励都是ios
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'WOKT Pool',
    icon: OKBSvg,
    coin: 'WOKT',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#4494F7',
      dark: '#2a5a95'
    },
    address: '0x7DdCE55Fccd3BBF8DBef27EF90C7b83931F8bD27',
    MLP: '0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15', // 单池属性
    mlpDecimal: 18,
    rewards1Address: IOS_ADDRESS, // 单池奖励都是ios
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'OKB Pool',
    icon: OKBSvg,
    coin: 'OKB',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#4494F7',
      dark: '#2a5a95'
    },
    address: '0x61EA0f1b2cca3fA01F22e3ebB8eb99Cf49E59EdC',
    MLP: '0xdf54b6c6195ea4d948d03bfd818d365cf175cfc2', // 单池属性
    mlpDecimal: 18,
    rewards1Address: IOS_ADDRESS, // 单池奖励都是ios
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'BTCK Pool',
    icon: BTCKSvg,
    coin: 'BTCK',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#F7931A',
      dark: '#a86513'
    },
    address: '0xd89726063D0Ae3F8DcCE47A8F8766d562220EFb2',
    MLP: '0x54e4622dc504176b3bb432dccaf504569699a7ff', // 单池属性
    mlpDecimal: 18,
    rewards1Address: IOS_ADDRESS, // 单池奖励都是ios
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'ETHK Pool',
    icon: ETHSvg,
    coin: 'ETHK',
    earnedName: 'IOS EARNED',
    themeColor: {
      light: '#627EEA',
      dark: '#5066ba'
    },
    address: '0x081D7295D3102Bf6A0602943269BfA9E3A7AC21b',
    MLP: '0xef71ca2ee68f45b9ad6f72fbdb33d707b872315c', // 单池属性
    mlpDecimal: 18,
    rewards1Address: IOS_ADDRESS, // 单池奖励都是ios
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  }
]
