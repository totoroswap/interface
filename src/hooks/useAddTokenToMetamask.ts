import { wrappedCurrency } from 'utils/wrappedCurrency'
import { Currency, Token } from '@totoroswap/sdk'
import { useCallback, useState } from 'react'
import { useActiveWeb3React } from 'hooks'
import { IOS_TOKEN_INFO } from '../constants'
export default function useAddTokenToMetamask(
  currencyToAdd: Currency | undefined
): { addToken: () => void; success: boolean | undefined } {
  const { library, chainId } = useActiveWeb3React()

  const token: Token | undefined = wrappedCurrency(currencyToAdd, chainId)

  const [success, setSuccess] = useState<boolean | undefined>()

  const addToken = useCallback(() => {
    if (library && library.provider.isMetaMask && library.provider.request && token) {
      library.provider
        .request({
          method: 'wallet_watchAsset',
          params: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            //@ts-ignore // need this for incorrect ethers provider type
            type: 'ERC20',
            options: {
              address: IOS_TOKEN_INFO.address,
              symbol: IOS_TOKEN_INFO.symbol,
              decimals: IOS_TOKEN_INFO.decimals,
              image: IOS_TOKEN_INFO.icon
            }
          }
        })
        .then(success => {
          setSuccess(success)
        })
        .catch(() => setSuccess(false))
    } else {
      setSuccess(false)
    }
  }, [library, token])

  return { addToken, success }
}
