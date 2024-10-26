export type RoutesPath = {
  base: string
  settings: string
  account: string
  subscription: string
  payment: string
  failure: string
  completion: string
  loading: string
  errorNotFound: string
}

export const routesPath: RoutesPath = {
  base: '/ui',
  settings: '/ui/settings',
  account: '/ui/account',
  subscription: '/ui/subscription',
  payment: '/ui/stripe',
  failure: '/ui/failure',
  completion: '/ui/completion',
  loading: '/ui/loading',
  errorNotFound: '/ui/error/not-found',
}
