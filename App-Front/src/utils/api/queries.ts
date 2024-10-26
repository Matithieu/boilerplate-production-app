import { fetchWithConfig } from './config'
import handleStatusError from './errors/handleStatusError'

/**
 *
 * User
 *
 */
export const fetchUser = async () => {
  const response = await fetchWithConfig('/v1/user', 'GET')

  if (response.ok) {
    return await response.json()
  }

  throw new Error(await handleStatusError(response, 'Error fetching user'))
}

/**
 *
 * Stripe
 *
 */
export async function startStripeSubscription(priceId: string) {
  const response = await fetchWithConfig(
    '/v1/stripe/subscriptions/trial',
    'POST',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-priceId': priceId,
      },
    },
  )

  if (response.ok) {
    return response.text()
  }

  // ToDo handle error
  // handleStatusError(response, '/v1/stripe/subscriptions/trial')
  return null
}
