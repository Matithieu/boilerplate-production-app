import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import {
  Box,
  Divider,
  List,
  ListItemButton,
  listItemButtonClasses,
  Typography,
} from '@mui/material'
import { FC, Fragment } from 'react'

import { formatMessage } from '../../../services/intl/intl'
import { useAppNavigate } from '../../../utils/navigation/navigation'
import layoutMessages from '../layout.messages'
import LayoutAvatarItem from './LayoutAvatarItem'

const LayoutListItems: FC = ({}) => {
  const { navigation } = useAppNavigate()

  return (
    <Fragment>
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List>
          <ListItemButton
            onClick={() => {
              navigation.toSettings()
            }}
          >
            <SettingsRoundedIcon
              sx={{
                fontSize: { xs: '1.5rem', md: 'inherit' },
              }}
            />
            <Typography variant="body1">
              {formatMessage(layoutMessages.settings)}
            </Typography>
          </ListItemButton>
        </List>
      </Box>
      <Divider />
      <LayoutAvatarItem />
    </Fragment>
  )
}

export default LayoutListItems
