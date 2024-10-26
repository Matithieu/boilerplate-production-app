import { User } from '../../data/types/index.types'
import { fetchWithConfig } from './config'
import handleStatusError from './errors/handleStatusError'

export const updateUserOnboarding = async () => {
  const response = await fetchWithConfig('/v1/completeOnboarding', 'POST')

  if (response.ok) {
    return
  }

  throw new Error(
    await handleStatusError(response, 'Error updating user onboarding'),
  )
}

export async function updateUser(user: User) {
  const response = await fetchWithConfig('/v1/update-user', 'PUT', {
    body: user,
  })

  if (response.ok) {
    return
  }

  throw new Error(await handleStatusError(response, `Error updating user`))
}
