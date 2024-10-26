import { FC } from 'react'

import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'

export const LoadingText: FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p>{formatMessage(commonMessages.loading)}</p>
    </div>
  )
}
