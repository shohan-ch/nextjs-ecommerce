import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./ProductCarousel.module.scss";
type Props = {
  title: string;
  products: {
    id: number;
    name: string;
    image: string;
    price: number;
  }[];
};

const ProductCarousel = ({ title, products }: Props) => {
  return (
    <Box>
      <Stack direction={"row"} spacing={3} sx={{ alignItems: "center" }}>
        <Box sx={{ borderTop: "1px solid black", flexGrow: 1 }}></Box>
        <Typography variant="h5" className={styles.title}>
          {title}{" "}
        </Typography>
        <Box sx={{ borderTop: "1px solid black", flexGrow: 1 }}></Box>
      </Stack>
    </Box>
  );
};

export default ProductCarousel;
