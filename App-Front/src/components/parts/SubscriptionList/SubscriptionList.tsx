import { Box } from '@mui/material'
import { FC, useState } from 'react'

import { subscriptionProducts } from '../../../data/Stripe/subscription'
import SubscriptionCard from './components/SubscriptionCard'

const SubscriptionList: FC = () => {
  const [buttonClicked, setButtonClicked] = useState(false)

  const sortedSubscriptions = subscriptionProducts.sort(
    (a, b) => a.price - b.price,
  )

  const handleCardClick = () => {
    setButtonClicked(true)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        gap: '30px',
      }}
    >
      {sortedSubscriptions.map((option, index) => (
        <SubscriptionCard
          key={index}
          isDisabled={buttonClicked}
          isFavorite={option.isFavorite}
          subscriptionItem={option}
          onCardClick={handleCardClick}
        />
      ))}
    </Box>
  )
}

export default SubscriptionList
