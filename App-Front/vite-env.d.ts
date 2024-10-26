/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLIC_KEY: string
  readonly VITE_STRIPE_SECRET_KEY: string

  readonly VITE_FRONTEND_URL: string

  readonly VITE_PROXY_BASE_URL: string
  readonly VITE_PROXY_PORT: string

  readonly VITE_OAUTH_BASE_URL: string
  readonly VITE_OAUTH_SIGNIN_URL: string
  readonly VITE_OAUTH_SIGNOUT_URL: string
  readonly VITE_OAUTH_SIGNIN_REDIRECT_URL: string
  readonly VITE_OAUTH_SIGNOUT_REDIRECT_URL: string

  readonly VITE_API_BASE_URL: string
  readonly VITE_API_PREFIX: string
  readonly VITE_API_BASE_V1_URL: string
  readonly VITE_API_COMPANY_ENDPOINT: string

  readonly STRIPE_PRICE_ID_FREE: string
  readonly STRIPE_PRICE_ID_BASIC: string
  readonly STRIPE_PRICE_ID_PREMIUM: string
  readonly VITE_STRIPE_BILLING_PORTAL_CODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
