import { create } from "zustand";
export const useStore = create((set) => ({
  user: null,
  updateUser: (users) => set({ user: users }),
}));

