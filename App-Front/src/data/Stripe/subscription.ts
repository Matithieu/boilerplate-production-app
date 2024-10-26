import { formatMessage } from '../../services/intl/intl'
import subscriptionMessages from './subscription.messages'

const STRIPE_PRICE_ID_FREE = import.meta.env.VITE_STRIPE_PRICE_ID_FREE
const STRIPE_PRICE_ID_BASIC = import.meta.env.VITE_STRIPE_PRICE_ID_BASIC
const STRIPE_PRICE_ID_PREMIUM = import.meta.env.VITE_STRIPE_PRICE_ID_PREMIUM

const returnIdIfEmpty = (data: string | undefined, id: string) => {
  if (data === '' || data === undefined) {
    return id
  }

  return data
}

export interface SubscriptionItem {
  name: string
  price: number
  image: string
  description: string
  id: string
  isFavorite?: boolean
}

export const subscriptionProducts: SubscriptionItem[] = [
  {
    name: formatMessage(subscriptionMessages.freePlanName),
    description: formatMessage(subscriptionMessages.requestPerDay, {
      requestCount: 15,
    }),
    price: 0,
    id: returnIdIfEmpty(STRIPE_PRICE_ID_FREE, 'price_1PdHWLKjCboMtBPjo3G7vEiC'),
    image: 'https://source.unsplash.com/NUoPWImmjCU',
  },
  {
    name: formatMessage(subscriptionMessages.basicPlanName),
    description: formatMessage(subscriptionMessages.requestPerDay, {
      requestCount: 100,
    }),
    price: 25,
    id: returnIdIfEmpty(
      STRIPE_PRICE_ID_BASIC,
      'price_1PSHL4KjCboMtBPjAF9ZID55',
    ),
    image: 'https://source.unsplash.com/NUoPWImmjCU',
    isFavorite: true,
  },
  {
    name: formatMessage(subscriptionMessages.premiumPlanName),
    description: formatMessage(subscriptionMessages.requestPerDay, {
      requestCount: 200,
    }),
    price: 35,
    id: returnIdIfEmpty(
      STRIPE_PRICE_ID_PREMIUM,
      'price_1PSHL1KjCboMtBPjlaDDyTTo',
    ),
    image: 'https://source.unsplash.com/NUoPWImmjCU',
  },
]
