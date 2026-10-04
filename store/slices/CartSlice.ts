import { createSlice } from "@reduxjs/toolkit/react";

type Cart = {
  productId: number;
  productVariantId: number;
  name: string;
  image: string;
  color: string;
  quantity: number;
  size: string;
  stockSizes: Record<string, string>;
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
      if (!product) {
        state.push(payload);
      } else {
        product.quantity = payload.quantity;
        product.size = payload.size;
      }
    },

    incrementCart: (state, action) => {
      let productVarientId = action.payload.productVariantId;

      console.log(productVarientId, "pp id");
      let product = state.find((p) => p.productVariantId === productVarientId);
      if (product) product.quantity = product?.quantity + 1;
    },

    decrementCart: (state, action) => {
      let productVarientId = action.payload.productVariantId;
      let product = state.find((p) => p.productVariantId === productVarientId);
      if (product) product.quantity = product?.quantity - 1;
    },

    removeCart: (state, action) => {
      let productVarientId = action.payload.productVariantId;
      console.log(productVarientId);
      return state.filter((f) => f.productVariantId != productVarientId);
    },
  },

  selectors: {
    selectAllCarts: (state) => {
      return state;
    },
  },
});

export const { addCart, incrementCart, decrementCart, removeCart } =
  cartSlice.actions;

export const { selectAllCarts } = cartSlice.selectors;

export default cartSlice.reducer;
