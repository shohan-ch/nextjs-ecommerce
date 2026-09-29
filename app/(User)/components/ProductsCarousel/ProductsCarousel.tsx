"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CarouselSingleProduct from "./CarouselSingleProduct";
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

let index = 0;

const ProductsCarousel = ({ title, products }: Props) => {
  const [carouselProducts, setCarouselProcducts] = useState(products);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleNext = () => {
    let sliceProducts = carouselProducts.slice(2);
    sliceProducts.push(carouselProducts[index]);
    sliceProducts.push(carouselProducts[index + 1]);
    setCarouselProcducts(sliceProducts);
    index + 2;
    if (index == carouselProducts.length) {
      index = 0;
    }
  };

  const handlePrev = () => {
    let sliceProducts = carouselProducts.slice(0, carouselProducts.length - 2);
    let lastProduct = carouselProducts[carouselProducts.length - 1];
    let lastSecondProduct = carouselProducts[carouselProducts.length - 2];
    sliceProducts.unshift(lastProduct);
    sliceProducts.unshift(lastSecondProduct);
    setCarouselProcducts(sliceProducts);
  };

  // Breakpoint extract for carousel button
  const theme = useTheme();
  const useCheckBreakPoint = (device: "xs" | "sm" | "md" | "lg" | "xl") => {
    return useMediaQuery(theme.breakpoints.only(device));
  };
  const isXl = useCheckBreakPoint("xl");
  const isLg = useCheckBreakPoint("lg");
  const isMd = useCheckBreakPoint("md");
  const isSm = useCheckBreakPoint("sm");
  const visibleColumns = isXl ? 6 : isLg ? 5 : isMd ? 4 : isSm ? 3 : 2;
  const isShowButton = carouselProducts.length > visibleColumns;

  return (
    <Box className="pt-10 " sx={{ position: "relative" }}>
      <Stack
        className="pb-10"
        direction={"row"}
        spacing={3}
        sx={{ alignItems: "center" }}
      >
        <Box sx={{ borderTop: "1px solid black", flexGrow: 1 }}></Box>
        <Typography variant="h5" className={styles.title}>
          {title}{" "}
        </Typography>
        <Box sx={{ borderTop: "1px solid black", flexGrow: 1 }}></Box>
      </Stack>

      {/* Buttons */}

      {isShowButton && (
        <Box>
          <IconButton
            aria-label="Previous"
            onClick={handlePrev}
            className={styles.iconBtn}
            sx={{
              left: -1,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <IconButton
            aria-label="Next"
            onClick={handleNext}
            className={styles.iconBtn}
            sx={{
              right: -1,
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      )}

      {/* Grid container */}
      <Box className={isShowButton ? "px-5" : ""}>
        <Grid
          ref={scrollRef}
          container
          wrap="nowrap"
          spacing={2}
          sx={{
            p: "0.2rem",
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          columns={{ xs: 12, lg: 10, xl: 12 }}
        >
          {carouselProducts.length > 0 &&
            carouselProducts.map((p) => (
              <Grid
                key={p.id}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                  lg: 2,
                  xl: 2,
                }}
                sx={{
                  flexShrink: 0,
                }}
              >
                <CarouselSingleProduct product={p} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductsCarousel;
