import { Box, Slider, Typography } from "@mui/material";
import React from "react";

type Props = {
  values: number[];
  handleChange: (e: Event, newValue: number[]) => void;
};

const BaseRangeSlider = ({ values, handleChange }: Props) => {
  return (
    <>
      <Box>
        <Typography variant="h6" className="subHeading">
          Price Range
        </Typography>

        <Slider
          getAriaLabel={() => "Price range"}
          value={values}
          onChange={handleChange}
          max={5000}
          min={700}
          size="small"
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 0.1,
            "&>.MuiTypography-body2": {
              fontSize: "12px",
            },
          }}
        >
          <Typography variant="body2">৳{values[0]}</Typography>
          <Typography variant="body2">৳{values[1]}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default BaseRangeSlider;
