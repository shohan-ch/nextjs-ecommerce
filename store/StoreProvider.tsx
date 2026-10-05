"use client";

import { store } from "@/store/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { setCart } from "./slices/CartSlice";

type Props = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: Props) => {
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      store.dispatch(setCart(JSON.parse(savedCart)));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const carts = store.getState().cart;
      localStorage.setItem("cart", JSON.stringify(carts));
      console.log("run page change");
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
};

export default StoreProvider;
