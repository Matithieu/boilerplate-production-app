import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { Button, Divider, Paper, Typography } from '@mui/material'
import { FC } from 'react'

import useAuthManager from '../../hooks/useAuthManager'
import { formatMessage } from '../../services/intl/intl'
import useAuthStore from '../../store/authStore'
import purchasingMessages from './purchasing.messages'

const OrderSuccessPage: FC = () => {
  // const queryParams = new URLSearchParams(window.location.search)
  const { setAuthUser } = useAuthStore()
  const { signIn } = useAuthManager()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        marginTop: '7rem',
      }}
    >
      <Paper style={{ padding: '20px', maxWidth: '400px' }} variant="elevation">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <CheckCircleOutlineIcon
            color="success"
            style={{ fontSize: '60px' }}
          />
          <Typography variant="h4">
            {formatMessage(purchasingMessages.thankYouForYourOrder)}
          </Typography>
          <Typography variant="body2">
            {formatMessage(purchasingMessages.thankYouForYourOrder)}
          </Typography>
        </div>

        <Divider style={{ marginBottom: '20px' }} />

        <Button
          color="primary"
          style={{ marginTop: '20px' }}
          variant="contained"
          onClick={() => {
            setAuthUser(null)
            // Going through signIn flow refresh the token inside the oauth2 proxy
            // Allowing the roles inside the token to be updated
            signIn()
          }}
        >
          Let&apos;s go !
        </Button>
      </Paper>
    </div>
  )
}

export default OrderSuccessPage
