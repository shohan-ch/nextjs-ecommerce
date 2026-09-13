"use client";

import { decrement, increment, selectCount } from "@/store/slices/CountSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Link from "next/link";
import React from "react";

type Props = {};

const Count = (props: Props) => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);

  return (
    <div>
      Count Page
      <br />
      <h3>Count is {count}</h3>
      <button onClick={() => dispatch(increment())}>Inc</button>
      <button onClick={() => dispatch(decrement())}>Dec</button>
      <br />
      <Link href={"/posts"}> Post page</Link>
      <Link href={"/"}>Home</Link>
    </div>
  );
};

export default Count;
