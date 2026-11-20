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
  handleChange: (value: string, isChecked: boolean) => void;
  checkedItems: string[];
};

const BaseCheckbox = ({ title, items, handleChange, checkedItems }: Props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    handleChange(value, isChecked);
  };

  return (
    <>
      <FormLabel className="subHeading" sx={{ color: "text.primary" }}>
        {title || ""}
      </FormLabel>
      <FormGroup>
        {items?.length > 0 &&
          items?.map((i, index) => (
            <FormControlLabel
              key={index}
              value={i.id}
              control={
                <Checkbox
                  checked={checkedItems.includes(String(i.id))}
                  onChange={onChange}
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
