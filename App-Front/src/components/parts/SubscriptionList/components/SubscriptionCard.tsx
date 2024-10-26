import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FC, useEffect } from 'react'

import { SubscriptionItem } from '../../../../data/Stripe/subscription'
import commonMessages from '../../../../services/intl/common.messages'
import { formatMessage } from '../../../../services/intl/intl'
import { startStripeSubscription } from '../../../../utils/api/queries'

type SubscriptionCardProps = {
  subscriptionItem: SubscriptionItem
  isDisabled: boolean
  isFavorite?: boolean
  onCardClick: () => void
}

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscriptionItem: item,
  isDisabled: disabled,
  isFavorite,
  onCardClick,
}) => {
  const { data, refetch, isSuccess } = useQuery({
    queryKey: ['sub' + item.id],
    queryFn: () => startStripeSubscription(item.id),
    enabled: false,
  })

  const handleClick = () => {
    onCardClick()
    refetch()
  }

  useEffect(() => {
    if (isSuccess && data) {
      window.open(data, '__blank')
    }
  }, [data, isSuccess])

  return (
    <Card
      sx={{
        wordBreak: 'break-word',
        width: '350px',
        ...(isFavorite && {
          transform: 'scale(1.10)',
        }),
      }}
    >
      <CardContent>
        <Typography variant="h5">{item.name}</Typography>
        <Typography variant="h6">{item.price} €</Typography>
        <ul>
          <li>
            <Typography variant="body2">{item.description}</Typography>
          </li>
        </ul>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          disabled={disabled}
          variant="contained"
          onClick={handleClick}
        >
          {formatMessage(commonMessages.subscribe)}
        </Button>
      </CardActions>
    </Card>
  )
}

export default SubscriptionCard
