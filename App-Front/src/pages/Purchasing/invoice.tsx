import { useEffect } from 'react'

import useAuthStore from '../../store/authStore'

function ViewInvoices() {
  const { authUser } = useAuthStore()
  const emailInURL = encodeURIComponent(authUser?.email ?? '')
  const STRIPE_BILLING_CODE = import.meta.env.VITE_STRIPE_BILLING_PORTAL_CODE

  // Alert the user that they are being redirected to the Stripe billing page
  useEffect(() => {
    alert('Redirecting to Stripe billing page...')
    window.open(
      `https://billing.stripe.com/p/login/${STRIPE_BILLING_CODE}?prefilled_email=${emailInURL}`,
    )
  }, [STRIPE_BILLING_CODE, emailInURL])

  return null
}

export default ViewInvoices
