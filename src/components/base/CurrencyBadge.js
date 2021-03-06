// @flow

import React from 'react'
import styled from 'styled-components'
import { getCryptoCurrencyIcon } from '@ledgerhq/live-common/lib/react'

import type { Currency } from '@ledgerhq/live-common/lib/types'

import { rgba } from 'styles/helpers'

import Box from 'components/base/Box'

const CryptoIconWrapper = styled(Box).attrs({
  align: 'center',
  justify: 'center',
  bg: p => rgba(p.cryptoColor, 0.1),
  color: p => p.cryptoColor,
})`
  border-radius: 50%;
  width: ${p => p.size || 40}px;
  height: ${p => p.size || 40}px;
`

export function CurrencyCircleIcon({
  currency,
  size,
  ...props
}: {
  currency: Currency,
  size: number,
}) {
  const Icon = getCryptoCurrencyIcon(currency)
  return (
    <CryptoIconWrapper size={size} cryptoColor={currency.color} {...props}>
      {Icon && <Icon size={size / 2} />}
    </CryptoIconWrapper>
  )
}

function CurrencyBadge({ currency, ...props }: { currency: Currency }) {
  return (
    <Box horizontal flow={3} {...props}>
      <CurrencyCircleIcon size={40} currency={currency} />
      <Box>
        <Box ff="Museo Sans|ExtraBold" color="dark" fontSize={2} style={{ letterSpacing: 2 }}>
          {currency.ticker}
        </Box>
        <Box ff="Open Sans" color="dark" fontSize={5}>
          {currency.name}
        </Box>
      </Box>
    </Box>
  )
}

export default CurrencyBadge
