import { Box, Card, Divider, Typography } from '@mui/material'
import { FC } from 'react'

import ChangeLanguageSelect from '../../../components/common/Select/ChangeLanguageSelect'
import { formatMessage } from '../../../services/intl/intl'
import ColorSchemeToggle from '../../Layout/components/ColorScheme'
import settingsMessages from '../settings.messages'

const AppearanceTab: FC = () => {
  return (
    <Box>
      <Card
        sx={{
          maxWidth: '400px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        variant="outlined"
      >
        <Typography variant="h4">
          {formatMessage(settingsMessages.language)}
        </Typography>

        <ChangeLanguageSelect />
      </Card>

      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <Card
        sx={{
          maxWidth: '400px',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        variant="outlined"
      >
        <Typography variant="h4">
          {formatMessage(settingsMessages.appearance)}
        </Typography>
        <Box>
          <ColorSchemeToggle />
        </Box>
      </Card>
    </Box>
  )
}

export default AppearanceTab
