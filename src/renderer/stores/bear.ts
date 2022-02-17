import create, { State } from 'zustand'

export interface BearsStates extends State {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

export const useBearStore = create<BearsStates>((set) => ({
  bears: 5,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))
