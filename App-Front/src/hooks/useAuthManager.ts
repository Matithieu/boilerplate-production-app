import { fetchUserEmail } from '../utils/proxy'

export default function useAuthManager() {
  const LOGIN_URL = import.meta.env.VITE_OAUTH_SIGNIN_URL
  const LOGOUT_URL = import.meta.env.VITE_OAUTH_SIGNOUT_URL

  const LOGIN_REDIRECT_URL = import.meta.env.VITE_OAUTH_SIGNIN_REDIRECT_URL
  const LOGOUT_REDIRECT_URL = import.meta.env.VITE_OAUTH_SIGNOUT_REDIRECT_URL

  return {
    signIn: () => {
      const signInUrl = new URL(LOGIN_URL)
      signInUrl.searchParams.set('rd', LOGIN_REDIRECT_URL)
      window.open(signInUrl.toString(), '_self')
    },
    signOut: () => {
      const signOutUrl = new URL(LOGOUT_URL)
      signOutUrl.searchParams.set('rd', LOGOUT_REDIRECT_URL)
      window.open(signOutUrl.toString(), '_self')
    },
    getUserEmail: async () => await fetchUserEmail(),
  }
}
