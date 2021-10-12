import { Currency, ETHER, Token } from '@totoroswap/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'OKT'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}