import { useNavigate } from 'react-router-dom'
import { ValueOf } from 'type-fest'

import { RoutesPath } from './routesPath'

/**
 * Centralized navigation functions to simplify navigation
 */
export const useAppNavigate = () => {
  const navigate = useNavigate()

  const toHome = () => navigate('/ui')
  const toSettings = () => navigate('/ui/settings')
  const toAccount = () => navigate('/ui/account')
  const toSubscription = () => navigate('/ui/subscription')
  const toFailure = () => navigate('/ui/failure')
  const toOrderConfirmation = () => navigate('/ui/completion')
  const toErrorNotFound = () => navigate('/ui/error/not-found')
  const toPage = (path: ValueOf<RoutesPath>) => navigate(path)

  return {
    navigation: {
      toHome,
      toSettings,
      toAccount,
      toSubscription,
      toFailure,
      toOrderConfirmation,
      toErrorNotFound,
      toPage,
    },
  }
}
