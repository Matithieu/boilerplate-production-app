import { fetchToProxy } from './proxy'

export const fetchUserEmail = async () => {
  try {
    const response = await fetchToProxy({
      method: 'GET',
      url: '/oauth2/userinfo',
    })

    if (response) {
      return
    }
  } catch (error) {
    throw new Error('Failed to fetch user data')
  }
}

export const fetchLoginProxy = async () => {
  try {
    const response = await fetchToProxy({
      method: 'GET',
      url: '/oauth2/sign_in',
    })

    if (response) {
      return
    }
  } catch (error) {
    throw new Error('Failed to fetch user data')
  }
}
