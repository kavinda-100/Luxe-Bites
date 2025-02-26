import { create } from "zustand";

type CategorySelectStore = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
};

export const useCategorySelectStore = create<CategorySelectStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
