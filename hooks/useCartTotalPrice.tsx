"use client";

import { selectAllCarts } from "@/store/slices/CartSlice";
import { useAppSelector } from "@/store/store";

export const useCartTotalPrice = () => {
  const carts = useAppSelector(selectAllCarts);
  let subtotal = 0;
  let shippingPrice = 90;
  carts.forEach((c) => {
    subtotal += Number(c.price) * c.quantity;
  });
  let total = subtotal + shippingPrice;

  return total;
};
