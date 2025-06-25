import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const initialState = {
  shared: {
    countTotal: 0,
  },
  index: {
    count: 0,
  },
}

export const useStore = create(
  combine(initialState, (set, get) => ({
    increment: () =>
      set({
        index: {
          count: get().index.count + 1,
        },
        shared: {
          countTotal: get().shared.countTotal + get().index.count + 1,
        },
      }),
  })),
)

// Store de usuários
export * from './userStore'
