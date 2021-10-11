import UsdtIosSvg from '../../assets/svg/pools/us_ios.svg'
import WoktIosSvg from '../../assets/svg/pools/wokt_ios.svg'
import UsdtBtckSvg from '../../assets/svg/pools/usdt_btck.svg'
import UsdtEthkSvg from '../../assets/svg/pools/usdt_ethk.svg'
import UsdtLtcSvg from '../../assets/svg/pools/usdt_ltc.svg'
import UsdtDotSvg from '../../assets/svg/pools/usdt_dot.svg'
import UsdtOkbSvg from '../../assets/svg/pools/usdt_okb.svg'
import UsdtWoktSvg from '../../assets/svg/pools/usdt_wokt.svg'

import BtckEthkIosSvg from '../../assets/svg/pools/btck_ethk.svg'
import WokbOkbSvg from '../../assets/svg/pools/okb_okb.svg'
import IOSPoolsAbi from '../../constants/abis/TotoroPools.json'
import { ChainId } from '@totoroswap/sdk'
import {
  IOS_ADDRESS,
  USDT_ADDRESS,
  ETHK_ADDRESS,
  WOKT_ADDRESS,
  BTCK_ADDRESS,
  OKB_ADDRESS,
  LTCK_ADDRESS,
  DOTK_ADDRESS
} from '../../constants'

export const farmPools = [
  {
    title: 'USDT/IOS LP',
    icon: UsdtIosSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',
    coin: 'USDT/IOS LP',
    address: '0xBfA2BDec966b866ACB6b81266847D5B7f2034a30',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x56bb69f74562a267b02699f5ff8b32c291231cb7', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: IOS_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'OKT/IOS LP',
    icon: WoktIosSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'OKT/IOS LP',
    address: '0x39De914B76d8A41278AeA469Aa93cF1eC3256dC8',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0xC9E00665De025ee8Bfea2eFbA7aeE73854356b6e', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: WOKT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: IOS_ADDRESS,
    stakeAddress0: 'OKT', // 用于跳转创建流动性页面，OKT的地址有所不同
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT/OKT LP',
    icon: UsdtWoktSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'USDT/OKT LP',
    address: '0x704551FdcbF020939340737Ff758008DA5Aba4cc',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x44c147D0c9623E49eabe8ae6cCD97D351E708DEE', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: WOKT_ADDRESS,
    stakeAddress1: 'OKT', // 用于跳转创建流动性页面，OKT的地址有所不同
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT/BTCK LP',
    icon: UsdtBtckSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'USDT/BTCK LP',
    address: '0x4f98a33089c2f9DB0E03b78e0C40115b1396261e',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x7b2e0a1DC702A467fdc855883AA1a5f293a1A0a2', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: BTCK_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT/ETHK LP',
    icon: UsdtEthkSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'USDT/ETHK LP',
    address: '0x43037E00E4B9bfA3484978e0C71bAe90917d5e70',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0xf028e6617084E87dd82D2426A898e9fa50337a57', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: ETHK_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'BTCK/ETHK LP',
    icon: BtckEthkIosSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'BTCK/ETHK LP',
    address: '0x48D1e01FE22ACB9b3548d94A8e8Df1BDC9DAE8f3',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x50E70d4a98eA9eF874347BCb391D96b34E8A8F5D', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: BTCK_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: ETHK_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT/OKB LP',
    icon: UsdtOkbSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'USDT/OKB LP',
    address: '0xcbA72f2636Be5F8116385675eb4b5D3424e2714E',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x704E0CF243B4D71d038dd8618012aFa77f983258', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: OKB_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'OKT/OKB LP',
    icon: WokbOkbSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'OKT/OKB LP',
    address: '0x84862BA96880fFE67B86C8b8aEb946327E89FD3e',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0xf9426972906Daeb688CFc3E05E3C24AF7d2fB78c', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: WOKT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: OKB_ADDRESS,
    stakeAddress0: 'OKT', // 用于跳转创建流动性页面，OKT的地址有所不同
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT/LTCK LP',
    icon: UsdtLtcSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'USDT/LTCK LP',
    address: '0x6F3286D6c2F35a111010A58D46FfD6B3252F0e6E',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x4A628C636Ad837A783863a97b3f30df36999F9E4', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: LTCK_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  },
  {
    title: 'USDT/DOT LP',
    icon: UsdtDotSvg,
    earnedName: 'IOS EARNED',
    stakeUrl: '',

    coin: 'USDT/DOT LP',
    address: '0xDB243cb33C1c45f1ED8B0F1D9188c97782345FEe',
    abi: IOSPoolsAbi,
    networkId: ChainId.OKT,
    mineMountainAddress: '0xd8c33866645B1B4856d1A1A15123ecb138c7A5A7', // 矿山的地址
    rewards1Address: IOS_ADDRESS, // LP奖励都是ios
    MLP: '0x6342c21127480f78e7BE6877c56175B931b2D096', // 质押的资产 stakingToken
    mlpDecimal: 18,
    address0: USDT_ADDRESS, // LP组合其中的一个，用于计算价值*2
    address1: DOTK_ADDRESS,
    settleToken: USDT_ADDRESS, // 转换价值的地址 现在都以USDT
    settleTokenDecimal: 18
  }
]
