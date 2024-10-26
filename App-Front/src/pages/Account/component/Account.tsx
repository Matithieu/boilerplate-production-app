import {
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Grid2,
  Input,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { User } from '../../../data/types/index.types'
import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import useAuthStore from '../../../store/authStore'
import { updateUser } from '../../../utils/api/mutations'
import { fetchUser } from '../../../utils/api/queries'
import { isNotNU } from '../../../utils/assertion.util'
import AccountMessages from '../account.messages'

const Account: FC = () => {
  const { authUser, setAuthUser } = useAuthStore()
  const [editMode, setEditMode] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(authUser)

  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    enabled: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  const mutation = useMutation({
    mutationFn: () => updateUser(editedUser as User),
    mutationKey: ['updateUser' + editedUser?.email],
    onError: (error) => {
      toast.error(`Error updating user: ${error.message}`)
    },
    onSuccess: () => {
      refetch()
      toast.success('User updated')
    },
  })

  useEffect(() => {
    if (data) {
      setEditedUser(data)
      setAuthUser(data)
    }
  }, [data, setAuthUser])

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleSave = () => {
    if (authUser !== null) {
      setEditMode(false)
      mutation.mutate()
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
  ) => {
    setEditedUser({ ...editedUser, [key]: e.target.value } as User)
  }

  if (isNotNU(editedUser)) {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Typography variant="h3">
          {formatMessage(AccountMessages.accountDetails)}
        </Typography>

        <Divider sx={{ marginTop: 2, marginBottom: 4 }} />

        <form>
          <Grid2 container spacing={3}>
            <Grid2 size={{ md: 12, xs: 12 }} sx={{ display: 'flex', gap: 2 }}>
              <FormControl>
                <TextField
                  label={formatMessage(commonMessages.firstName)}
                  disabled={!editMode}
                  id="firstName"
                  value={editedUser.firstName}
                  onChange={(e) => handleChange(e, 'firstName')}
                />
              </FormControl>
              <FormControl>
                <TextField
                  label={formatMessage(commonMessages.lastName)}
                  disabled={!editMode}
                  id="lastName"
                  value={editedUser.lastName}
                  onChange={(e) => handleChange(e, 'lastName')}
                />
              </FormControl>
            </Grid2>
            <Grid2 size={{ md: 6, xs: 12 }}>
              <FormControl>
                <TextField
                  label={formatMessage(commonMessages.phone)}
                  disabled={!editMode}
                  id="phone"
                  value={editedUser.phone ?? undefined}
                  onChange={(e) => handleChange(e, 'phone')}
                />
              </FormControl>
            </Grid2>
          </Grid2>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {mutation.isPending ? (
              <CircularProgress />
            ) : (
              <>
                {editMode ? (
                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={handleSave}
                  >
                    {formatMessage(commonMessages.save)}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleEdit}
                  >
                    {formatMessage(commonMessages.edit)}
                  </Button>
                )}
              </>
            )}
          </div>
        </form>
      </Card>
    )
  }
}

export default Account
