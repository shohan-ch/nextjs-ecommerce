// import { Box, Stack, Typography } from "@mui/material";
// import React from "react";

// type Props = {
//   details: {
//     title: string;
//     price: number;
//     sizes: any;
//     description: string;
//     colors: string[];
//   };
//   changedBycolor: (color: string) => void;
// };

// const colorList: Record<string, string> = {
//   Black: "#000000",
//   White: "#FFFFFF",
//   Brown: "#573a30",
// };

// const ProductDetails = ({ details, changedBycolor }: Props) => {
//   console.log(details, "dt");

//   const getSize = (e: React.MouseEvent<HTMLButtonElement>) => {
//     console.log(e.currentTarget.value);
//   };

//   return (
//     <Box>
//       <Stack direction={"column"} spacing={2}>
//         <Typography variant="h5">{details.title}</Typography>
//         <Typography variant="body1">Tk {details.price}</Typography>

//         {/* Colors */}

//         <Box className="flex-start gap-2">
//           {details.colors.length &&
//             details.colors.map((c) => (
//               <Box>
//                 <button
//                   className="display-block"
//                   value={c}
//                   onClick={() => changedBycolor(c)}
//                 >
//                   {" "}
//                   {c}
//                 </button>
//               </Box>
//             ))}
//         </Box>

//         {/* Sizes */}
//         <Box className="flex-start gap-2">
//           {Object.keys(details.sizes).map((s) => (
//             <Box>
//               <button className="display-block" value={s} onClick={getSize}>
//                 {s}
//               </button>
//             </Box>
//           ))}
//         </Box>

//         <Typography variant="body2">{details.description}</Typography>
//       </Stack>
//     </Box>
//   );
// };

// export default ProductDetails;

import { Box, Stack, Typography, Chip, Button, Rating } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

type Props = {
  details: {
    title: string;
    price: number;
    sizes: any;
    description: string;
    colors: string[];
    rating?: number;
    reviewCount?: number;
    originalPrice?: number;
    discountPercent?: number;
  };
  changedBycolor: (color: string) => void;
};

const colorList: Record<string, string> = {
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#573a30",
};

const ProductDetails = ({ details, changedBycolor }: Props) => {
  const [selectedColor, setSelectedColor] = React.useState<string>(
    details.colors?.[0] ?? "",
  );
  const [selectedSize, setSelectedSize] = React.useState<string>("");

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    changedBycolor(color);
  };

  const getSize = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    console.log(value);
    setSelectedSize(value);
  };

  return (
    <Box>
      <Stack direction="column" spacing={2.5}>
        {/* Title */}
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {details.title}
        </Typography>

        {/* Price */}
        <Stack direction="row" spacing={1.5}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            ${details.price}
          </Typography>

          {details.originalPrice && (
            <Typography
              variant="body1"
              sx={{
                textDecoration: "line-through",
                color: "text.disabled",
              }}
            >
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
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
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
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      bgcolor: swatch,
                      border: isSelected
                        ? "2px solid #1976d2"
                        : "1px solid #e0e0e0",
                      outline: isSelected ? "2px solid #1976d2" : "none",
                      outlineOffset: 2,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: 0,
                    }}
                  >
                    {isSelected && (
                      <CheckIcon
                        sx={{
                          fontSize: 16,
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
          <Stack direction="row" sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Size:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "primary.main",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Size Guide
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.5}>
            {Object.keys(details.sizes).map((s) => {
              const isSelected = selectedSize === s;
              return (
                <Box
                  key={s}
                  component="button"
                  value={s}
                  onClick={getSize}
                  sx={{
                    minWidth: 44,
                    height: 40,
                    borderRadius: 1.5,
                    border: isSelected
                      ? "2px solid #1976d2"
                      : "1px solid #e0e0e0",
                    bgcolor: isSelected ? "#e3f2fd" : "#fff",
                    color: isSelected ? "primary.main" : "text.primary",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {s}
                </Box>
              );
            })}
          </Stack>
        </Box>

        {/* Actions */}
        <Stack spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<ShoppingCartOutlinedIcon />}
            sx={{
              bgcolor: "#111",
              "&:hover": { bgcolor: "#000" },
              borderRadius: 2,
              py: 1.3,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            startIcon={<FavoriteBorderIcon />}
            sx={{
              borderColor: "#e0e0e0",
              color: "text.primary",
              borderRadius: 2,
              py: 1.3,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { borderColor: "#bdbdbd", bgcolor: "#fafafa" },
            }}
          >
            Add to Wishlist
          </Button>
        </Stack>

        {/* Description (kept from original, not in screenshot crop) */}
        <Typography variant="body2" color="text.secondary">
          {details.description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ProductDetails;
