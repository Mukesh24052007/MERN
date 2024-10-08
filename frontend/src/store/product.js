import { create } from "zustand";

export const setProductStore = create((set) => ({
  product: [],
  setProduct: (product) => set({ product }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {success: false, message: "fill all."}
    }
  }
}))