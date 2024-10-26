import { defineMessages } from 'react-intl'

const scope = 'subscriptions'

export default defineMessages({
  freePlanName: {
    defaultMessage: 'Free Plan',
    id: `${scope}.freePlanName`,
  },
  basicPlanName: {
    defaultMessage: 'Basic Plan',
    id: `${scope}.basicPlanName`,
  },
  premiumPlanName: {
    defaultMessage: 'Premium Plan',
    id: `${scope}.premiumPlanName`,
  },
  requestPerDay: {
    defaultMessage:
      '{requestCount, plural, one {# request per day} other {# requests per day}}',
    id: `${scope}.requestPerDay`,
  },
})
