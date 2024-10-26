import { create } from 'zustand'

import { User } from '../data/types/index.types'

type Store = {
  authUser: User | null
  setAuthUser: (user: Partial<User> | null) => void
}

const useAuthStore = create<Store>((set) => ({
  authUser: null,
  setAuthUser: (user) => set(() => ({ authUser: user as User | null })),
}))

export default useAuthStore
