"use client";
import { selectCount } from "@/store/slices/CountSlice";
import { useAppSelector } from "@/store/store";
import React from "react";

type Props = {};

const Post = (props: Props) => {
  const count = useAppSelector(selectCount);
  return (
    <div>
      Post Page
      <h3>Count is: {count}</h3>
    </div>
  );
};

export default Post;
