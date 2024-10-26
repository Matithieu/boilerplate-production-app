import { Box, Button, Container, Typography } from '@mui/material'

import { formatMessage } from '../../services/intl/intl'
import { useAppNavigate } from '../../utils/navigation/navigation'
import errorMessages from './error.messages'

export default function Page404() {
  const { navigation } = useAppNavigate()

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">404</Typography>
        <Typography variant="h4">
          {formatMessage(errorMessages.description)}
        </Typography>
        <Button
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          variant="contained"
          onClick={() => {
            navigation.toHome()
          }}
        >
          {formatMessage(errorMessages.buttonText)}
        </Button>
      </Box>
    </Container>
  )
}
