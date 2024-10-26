import { Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import useAuthManager from '../../../hooks/useAuthManager'
import { useAppNavigate } from '../../../utils/navigation/navigation'

interface ErrorButtonProps {
  error: Error
}

export function GlobalErrorButton({ error }: ErrorButtonProps) {
  const { navigation } = useAppNavigate()
  const authUser = useAuthManager()

  const handleButtonClick = () => {
    const actionMap: Record<string, () => void> = {
      'Subscription Error': () => navigation.toAccount(),
      Forbidden: () => navigation.toSubscription(),
      'Too Many Requests': () => navigation.toAccount(),
      'Network Error': () => authUser.signOut(),
      Unauthorized: () => authUser.signIn(),
    }

    const action =
      actionMap[error.message] || (() => toast.error('Unknown error'))
    action()
  }

  const getButtonLabel = () => {
    const labelMap: Record<string, string> = {
      'Subscription Error': 'Change Plan',
      Forbidden: 'Change Plan',
      'Too Many Requests': 'Select Subscription',
      'Network Error': 'Retry Connection',
      Unauthorized: 'Login',
    }

    return labelMap[error.message] || 'Try Again'
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <Typography>Error: {error.message}</Typography>
      <Button color="primary" variant="contained" onClick={handleButtonClick}>
        {getButtonLabel()}
      </Button>
    </div>
  )
}
