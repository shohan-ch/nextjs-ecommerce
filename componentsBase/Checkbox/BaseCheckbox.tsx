"use client";

import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  title?: string;
  items: { name: string; id: string | number; checked?: boolean }[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkedItems: string[];
};

const BaseCheckbox = ({ title, items, handleChange, checkedItems }: Props) => {
  return (
    <>
      <FormLabel>{title || ""}</FormLabel>
      <FormGroup>
        {items?.length > 0 &&
          items?.map((i, index) => (
            <FormControlLabel
              key={index}
              value={i.id}
              control={
                <Checkbox
                  checked={checkedItems.includes(String(i.id))}
                  onChange={handleChange}
                  value={i.id}
                  size="small"
                />
              }
              label={i.name}
              slotProps={{
                typography: {
                  sx: {
                    fontSize: "15px",
                  },
                },
              }}
            />
          ))}
      </FormGroup>
    </>
  );
};

export default BaseCheckbox;
