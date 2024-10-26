import { Box, Grid } from '@mui/material'
import { FC } from 'react'

import Tabs from '../../components/common/Tabs'
import HeaderTitle from '../../components/common/Texts/HeaderTitle'
import { formatMessage, formatMessagePlural } from '../../services/intl/intl'
import useAuthStore from '../../store/authStore'
import ViewInvoices from '../Purchasing/invoice'
import accountMessages from './account.messages'
import Account from './component/Account'

const AccountPage: FC = () => {
  const { authUser } = useAuthStore()

  return (
    <Grid>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 1,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <HeaderTitle
            text={`${formatMessage(accountMessages.welcome, { name: authUser?.firstName })}`}
          />
        </Box>

        <Tabs
          tabs={[
            {
              name: formatMessage(accountMessages.accountProfile),
              element: <Account />,
            },
            {
              name: formatMessagePlural(accountMessages.invoices),
              element: <ViewInvoices />,
            },
          ]}
        />
      </Box>
    </Grid>
  )
}

export default AccountPage
