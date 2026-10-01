"use client";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
type ItemType = {
  id: number;
  colorCode: string;
  name: string;
};
type Props = {
  title?: string;
  items?: ItemType[];
  onChange?: (value: string) => void;
  checkedItem?: string | number;
};

const BaseColorRadio = ({
  title,
  items = [],
  onChange,
  checkedItem,
}: Props) => {
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
        sx={{ display: "flex", flexDirection: "row", gap: 1, flexWrap: "wrap" }}
      >
        {items.length > 0 &&
          items.map((c) => {
            const selected = checkedItem === String(c.id);
            return (
              <React.Fragment key={c.id}>
                <Box sx={{ position: "relative" }}>
                  <FormControlLabel
                    value={c.id}
                    label={""}
                    control={
                      <Radio
                        disableRipple
                        sx={{
                          position: "absolute",
                          cursor: "pointer",
                          opacity: 0,
                        }}
                      />
                    }
                    sx={{
                      position: "relative",
                      m: 0,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      justifyContent: "center",
                      border: "2px solid",
                      borderColor: selected ? "#1976d2" : "#e0e0e0",
                      bgcolor: c.colorCode,
                      outlineOffset: "2px",
                      outline: selected ? "2px solid #1976d2" : "none",
                      //   color: selected ? "primary.contrastText" : "text.primary",
                    }}
                  />

                  {selected && (
                    <CheckIcon
                      sx={{ position: "absolute", top: 5, left: 5 }}
                      style={{
                        color: c.colorCode === "#FFFFFF" ? "#000" : "#fff",
                      }}
                    ></CheckIcon>
                  )}
                </Box>
              </React.Fragment>
            );
          })}
      </RadioGroup>
    </FormControl>
  );
};

export default BaseColorRadio;

// const isSelected = selectedColor === c;
// const swatch = colorList[c] ?? "#ccc";
// return (
//   <Box
//     key={c}
//     component="button"
//     onClick={() => handleColorClick(c)}
//     className={`${styles.colorSwatch} ${
//       isSelected ? styles["colorSwatch--selected"] : ""
//     }`}
//     style={{ backgroundColor: swatch }}
//   >
//     {isSelected && (
//       <CheckIcon
//         className={styles.checkIcon}
//         style={{
//           color: swatch === "#FFFFFF" ? "#000" : "#fff",
//         }}
//       />
//     )}
//   </Box>
// );
