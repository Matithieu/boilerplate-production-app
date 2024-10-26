import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { FC } from 'react'

import useAuthManager from '../../../hooks/useAuthManager'
import useAuthStore from '../../../store/authStore'
import { useAppNavigate } from '../../../utils/navigation/navigation'

const LayoutAvatarItem: FC = ({}) => {
  const { authUser } = useAuthStore()
  const authManager = useAuthManager()
  const { navigation } = useAppNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        minHeight: 60,
        maxHeight: 60,
      }}
    >
      <IconButton
        style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'space-between',
        }}
        onClick={(e) => {
          e.stopPropagation()
          navigation.toAccount()
        }}
      >
        <Avatar sizes="md" variant="rounded">
          {authUser?.firstName?.charAt(0).toLocaleUpperCase() ?? 'X'}
        </Avatar>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {authUser?.firstName ?? 'Error'}
          </Typography>
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {authUser?.lastName ?? 'Error'}
          </Typography>
        </Box>
      </IconButton>

      <IconButton
        color="inherit"
        sx={{
          display: 'flex',
        }}
        onClick={(e) => {
          e.preventDefault()
          authManager.signOut()
        }}
      >
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  )
}

export default LayoutAvatarItem
