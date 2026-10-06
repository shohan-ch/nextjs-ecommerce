"use client";

import { useSnackBar } from "@/providers/SnackbarProvider";
import { addCart } from "@/store/slices/CartSlice";
import { useAppDispatch } from "@/store/store";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./ProductDetails.module.scss";
import { useRouter } from "next/navigation";

type Props = {
  details: {
    productId?: number;
    productVariantId?: number;
    image?: string;
    name: string;
    price: number;
    sizes: Record<number, string>;
    description: string;
    colors: string[];
    originalPrice?: number;
  };
  changedBycolor: (color: string) => void;
};

const colorList: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Grey: "#808080",
  "Light Grey": "#D3D3D3",
  "Dark Grey": "#4A4A4A",
  "Navy Blue": "#000080",
  Blue: "#0000FF",
  "Sky Blue": "#87CEEB",
  Brown: "#573A30",
  "Dark Brown": "#5C4033",
  Tan: "#D2B48C",
  Beige: "#F5F5DC",
  Cream: "#FFFDD0",
  "Off White": "#FAF9F6",
  Red: "#FF0000",
  Maroon: "#800000",
  Wine: "#722F37",
  Green: "#008000",
  Olive: "#808000",
  "Mint Green": "#98FF98",
  Yellow: "#FFFF00",
  Mustard: "#FFDB58",
  Orange: "#FFA500",
  Pink: "#FFC0CB",
  Rose: "#FF007F",
  Purple: "#800080",
  Lavender: "#E6E6FA",
  Teal: "#008080",
  Khaki: "#F0E68C",
};

const ProductDetails = ({ details, changedBycolor }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const snackbar = useSnackBar();
  const [showMore, setShowMore] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState<string>(
    details.colors?.[0] ?? "",
  );
  const [selectedSize, setSelectedSize] = React.useState<string>("");
  const [stock, setStock] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    changedBycolor(color);
    setSelectedSize("");
    setQuantity(1);
  };

  const getSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    // console.log(value, "val");
    setSelectedSize(value);
    setStock(Number(details.sizes[Number(value)]));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const addQuantity = () => {
    if (!selectedSize) {
      snackbar?.open({ type: "error", message: "please select size first" });
      return;
    }
    if (quantity >= stock) {
      snackbar?.open({
        type: "error",
        message: "Product quantity exceeded stock on hand",
      });
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  const shouldShowMore = details.description.length > 500;

  const shortDescription = React.useMemo(() => {
    if (!shouldShowMore) {
      return details.description;
    }
    const first500 = details.description.slice(0, 500);
    // Find the last space before 500
    const lastSpace = first500.lastIndexOf(" ");
    let text = first500.slice(0, lastSpace);
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.innerHTML;
  }, [shouldShowMore]);

  const handelAddCart = () => {
    if (!selectedSize) {
      snackbar?.open({ type: "error", message: "please select size first" });
      return;
    }
    let { sizes, colors, description, originalPrice, ...rest } = details;
    let payload = {
      ...rest,
      stockSizes: sizes,
      size: selectedSize,
      quantity: quantity,
      color: selectedColor,
    };
    // console.log(payload, "cartData");
    dispatch(addCart(payload));
  };

  const handleBuy = () => {
    handelAddCart();
    router.push("/checkout");
  };

  return (
    <Box>
      <Stack direction="column" spacing={2.5}>
        {/* Title */}
        <Typography variant="h5" className={styles.title}>
          {details.name}
        </Typography>

        {/* Price */}
        <Stack direction="row" spacing={1.5} className={styles.priceRow}>
          <Typography variant="h5" className={styles.price}>
            <span style={{ color: "gray" }}>৳ </span>
            {details.price}
          </Typography>
          {details.originalPrice && (
            <Typography variant="body1" className={styles.originalPrice}>
              ${details.originalPrice}
            </Typography>
          )}
          {/* {details.discountPercent && (
            <Chip
              label={`${details.discountPercent}% OFF`}
              size="small"
              sx={{
                bgcolor: "#0f766e",
                color: "#fff",
                fontWeight: 700,
                borderRadius: 1,
              }}
            />
          )} */}
        </Stack>

        {/* Colors */}
        <Box>
          <Typography variant="body2" className={styles.colorLabel}>
            Color:{" "}
            <Typography component="span" variant="body2" color="text.secondary">
              {selectedColor}
            </Typography>
          </Typography>
          <Stack direction="row" spacing={1.5}>
            {details.colors?.length > 0 &&
              details.colors.map((c) => {
                const isSelected = selectedColor === c;
                const swatch = colorList[c] ?? "#ccc";
                return (
                  <Box
                    key={c}
                    component="button"
                    onClick={() => handleColorClick(c)}
                    className={`${styles.colorSwatch} ${
                      isSelected ? styles["colorSwatch--selected"] : ""
                    }`}
                    style={{ backgroundColor: swatch }}
                  >
                    {isSelected && (
                      <CheckIcon
                        className={styles.checkIcon}
                        style={{
                          color: swatch === "#FFFFFF" ? "#000" : "#fff",
                        }}
                      />
                    )}
                  </Box>
                );
              })}
          </Stack>
        </Box>

        {/* Sizes */}
        <Box>
          <Stack direction="row" className={`mb-1 ${styles.sizeHeaderRow}`}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Size:
            </Typography>
            <Typography variant="body2" className={styles.sizeGuide}>
              Size Guide
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={1.5}
            className={styles.sizeList}
            useFlexGap
          >
            {Object.entries(details.sizes).map(([key, value]) => {
              const isSelected = selectedSize === key;
              const isStockOut = !value;

              return (
                <Box
                  key={key}
                  component="button"
                  value={key}
                  onClick={getSize}
                  className={`${styles.sizeButton} ${
                    isSelected ? styles["sizeButton--selected"] : ""
                  } ${isStockOut ? styles["sizeButton--outOfStock"] : ""}`}
                  disabled={isStockOut}
                >
                  {key}
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Quantity */}
        <Stack direction="row" spacing={2} className="align-center">
          <Typography variant="h6" className={styles.quantityLabel}>
            Quantity:
          </Typography>
          <Box className={`align-center gap-3 ${styles.quantityBox}`}>
            <IconButton onClick={decreaseQuantity}>
              <RemoveIcon />
            </IconButton>
            {quantity}
            <IconButton onClick={addQuantity}>
              <AddIcon />
            </IconButton>
          </Box>
        </Stack>

        {/* Actions */}
        <Stack spacing={1.5} direction="row">
          <Button
            variant="outlined"
            startIcon={<ShoppingCartOutlinedIcon />}
            className={`${styles.actionButton} ${styles.cartButton}`}
            onClick={handelAddCart}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingBagOutlinedIcon />}
            className={`${styles.actionButton} ${styles.buyButton}`}
            onClick={handleBuy}
          >
            Buy Now
          </Button>
        </Stack>

        <Box className={styles.description}>
          <Box
            dangerouslySetInnerHTML={{
              __html: showMore ? details.description : shortDescription,
            }}
          />

          {shouldShowMore && (
            <Box className={!showMore ? styles.readMoreWrapper : ""}>
              <button
                type="button"
                onClick={() => setShowMore((prev) => !prev)}
                className={styles.readMoreBtn}
              >
                {showMore ? "Show Less" : "Show More"}
              </button>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
