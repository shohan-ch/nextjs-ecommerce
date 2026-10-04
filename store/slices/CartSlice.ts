import { createSlice } from "@reduxjs/toolkit/react";

type Cart = {
  productId: number;
  productVariantId: number;
  name: string;
  image: string;
  color: string;
  quantity: number;
  size: string;
  price: number | string;
};

type CartState = Cart[];

let initialState: CartState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addCart: (state, action) => {
      let payload: Cart = action.payload;
      let product = state.find(
        (p) => p.productVariantId === payload.productVariantId,
      );
      console.log(product, "from cart");
      if (!product) state.push(payload);
    },

    increment: (state, action) => {
      let productVarientId = action.payload.productVariantId;
      let product = state.find((p) => p.productVariantId === productVarientId)!;

      if (product) product.quantity = product?.quantity + 1;
    },

    decrement: (state, action) => {
      let productVarientId = action.payload.productVariantId;
      let product = state.find((p) => p.productVariantId === productVarientId)!;
      if (product) product.quantity = product?.quantity - 1;
    },

    remove: (state, action) => {
      let productVarientId = action.payload.productVariantId;
      state.filter((f) => f.productVariantId != productVarientId);
    },
  },

  selectors: {
    selectAllCarts: (state) => {
      return state;
    },
  },
});

export const { addCart, increment, decrement, remove } = cartSlice.actions;

export const { selectAllCarts } = cartSlice.selectors;

export default cartSlice.reducer;
