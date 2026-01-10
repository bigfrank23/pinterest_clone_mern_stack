import { create } from 'zustand'
import {persist} from 'zustand/middleware'

const useAuthStore = create(persist((set) => ({
  user: null,
  setCurrentUser: (newUser) => set({ currentUser:newUser }),
  removeCurrentUser: () => set({ currentUser: null }),
  updateCurrentUser: (updatedUser) => set({ currentUser: updatedUser }),
})))

export default useAuthStore