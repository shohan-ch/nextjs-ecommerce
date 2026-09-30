"use client";

import { TextField } from "@mui/material";
import React from "react";

type Props = {
  items?: { label: string; value: string | number }[];
  onChange?: () => void;
};

const BaseCheckbox = ({ items, onChange }: Props) => {
  return (
    <>
      <TextField type="checkbox" label="check me"></TextField>
    </>
  );
};

export default BaseCheckbox;
