import { Button, Typography } from '@mui/material'

import useAuthManager from '../../../hooks/useAuthManager'
import { useAppNavigate } from '../../../utils/navigation/navigation'

type ButtonProps = {
  message?: string
}

export function LoginButton({ message }: ButtonProps) {
  const authUser = useAuthManager()

  return (
    <div>
      <Typography>
        {message}
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            authUser.signIn()
          }}
        >
          Se connecter
        </Button>
      </Typography>
    </div>
  )
}

export function LogoutButton({ message }: ButtonProps) {
  const authUser = useAuthManager()

  return (
    <Typography>
      {message}
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          authUser.signOut()
        }}
      >
        Se déconnecter
      </Button>
    </Typography>
  )
}

export function SelectSubscriptionButton({ message }: ButtonProps) {
  const { navigation } = useAppNavigate()

  return (
    <Typography>
      {message}
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigation.toSubscription()
        }}
      >
        Select Subscription
      </Button>
    </Typography>
  )
}

export function QuotaExceededButton({ message }: ButtonProps) {
  const { navigation } = useAppNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <Typography>{message}</Typography>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          navigation.toAccount()
        }}
      >
        Change Plan
      </Button>
    </div>
  )
}
