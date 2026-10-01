"use client";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";

type Props = {
  title?: string;
  items?: string[];
  onChange?: (value: string) => void;
  checkedItem?: string | number;
};

const BaseSizeRadio = ({ title, items = [], onChange, checkedItem }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <FormControl>
      <FormLabel className="subHeading pb-5" sx={{ color: "text.primary" }}>
        {title}
      </FormLabel>

      <RadioGroup
        className={title ? "pt-4" : ""}
        value={checkedItem}
        onChange={handleChange}
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {items.length > 0 &&
          items.map((size) => {
            const selected = checkedItem === size;
            return (
              <FormControlLabel
                key={size}
                value={size}
                label={size}
                // Hide the radio circle but keep it accessible
                control={
                  <Radio
                    disableRipple
                    sx={{
                      position: "absolute",
                      cursor: "pointer",
                      opacity: 0,
                      // inset: 0,
                      // width: "100%",
                      // height: "100%",
                      // m: 0,
                      // p: 0,
                    }}
                  />
                }
                sx={{
                  position: "relative",
                  m: 0,
                  width: 32,
                  height: 32,
                  justifyContent: "center",
                  border: "1px solid",
                  borderColor: selected ? "primary.main" : "grey.300",
                  bgcolor: selected ? "primary.main" : "transparent",
                  color: selected ? "primary.contrastText" : "text.primary",
                  borderRadius: 1,
                  "&:hover": { borderColor: "primary.main" },
                  "&:has(input:focus-visible)": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: 2,
                  },
                  "& .MuiFormControlLabel-label": { fontSize: 12 },
                }}
              />
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default BaseSizeRadio;
