import { Box, Divider, Grid2 } from '@mui/material'
import { FC } from 'react'

import Tabs from '../../components/common/Tabs'
import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage } from '../../services/intl/intl'
import settingsMessages from './settings.messages'
import AppearanceTab from './tabs/Appearance'

const SettingsPage: FC = () => {
  return (
    <Grid2>
      <Box sx={{ px: { xs: 2, md: 6 } }}>
        <HeaderTitle text={formatMessage(settingsMessages.settings)} />
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Tabs
        tabs={[
          {
            name: formatMessage(settingsMessages.appearance),
            element: <AppearanceTab />,
          },
        ]}
      />
    </Grid2>
  )
}

export default SettingsPage
