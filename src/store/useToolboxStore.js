import { create } from "zustand";

export const useToolboxStore = create((set) => ({
  selected: "react",
  setSelected: (id) => set({ selected: id }),
}));