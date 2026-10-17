import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import counter from "./slices/CountSlice";
import cart from "./slices/CartSlice";
import { adminApi } from "./api/admin/baseAdminApi";

export const store = configureStore({
  reducer: {
    counter,
    cart,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(adminApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
