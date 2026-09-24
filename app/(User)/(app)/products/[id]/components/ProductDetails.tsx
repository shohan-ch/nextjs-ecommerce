import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  details: {
    title: string;
    price: number;
    sizes: any;
    description: string;
    colors: string[];
  };
};

const ProductDetails = ({ details }: Props) => {
  return (
    <Box>
      <Stack direction={"column"} spacing={2}>
        <Typography variant="h5">{details.title}</Typography>
        <Typography variant="body1">Tk {details.price}</Typography>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
