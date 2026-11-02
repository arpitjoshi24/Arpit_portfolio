import { create } from "zustand";

export const useBookStore = create((set, get) => ({
  flipped: 0,     // how many sheets have been turned
  total: 0,       // total sheets in the book
  turning: null,  // index of the sheet currently mid-flip
  muted: false,

  setTotal: (total) => set({ total }),

  next: () => {
    const { flipped, total } = get();
    if (flipped >= total) return;
    set({ flipped: flipped + 1, turning: flipped });
  },

  prev: () => {
    const { flipped } = get();
    if (flipped <= 0) return;
    set({ flipped: flipped - 1, turning: flipped - 1 });
  },

  clearTurning: () => set({ turning: null }),
  toggleMute: () => set((s) => ({ muted: !s.muted })),
}));