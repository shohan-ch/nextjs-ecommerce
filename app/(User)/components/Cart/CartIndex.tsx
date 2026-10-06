"use client";

import {
  decrementCart,
  incrementCart,
  removeCart,
  selectAllCarts,
} from "@/store/slices/CartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./CartIndex.module.scss";
import { useSnackBar } from "@/providers/SnackbarProvider";
import { usePathname, useRouter } from "next/navigation";
type Props = {};

const CartIndex = (props: Props) => {
  const router = useRouter();
  const patname = usePathname();
  const carts = useSelector(selectAllCarts);
  const snackbar = useSnackBar();
  const dispatch = useDispatch();

  const decrement = (variantId: number) => {
    let product = carts.find((c) => c.productVariantId == variantId);
    if (product?.quantity !== 1)
      dispatch(
        decrementCart({
          productVariantId: variantId,
        }),
      );
  };
  const increment = (variantId: number) => {
    let product = carts.find((c) => c.productVariantId == variantId);
    let quantityInStock = product?.stockSizes[Number(product.size)];
    if (Number(product?.quantity) >= Number(quantityInStock))
      snackbar?.open({
        type: "error",
        message: "Product quantity exceeded stock on hand",
      });
    else
      dispatch(
        incrementCart({
          productVariantId: variantId,
        }),
      );
  };

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")!);
    if (!cart.length) router.push("/");
  }, [carts]);

  return (
    <Box className={styles.container}>
      {/* Cart Items */}
      <Stack className={styles.cartItems}>
        {carts.length ? (
          <>
            {carts.map((cart) => (
              <React.Fragment key={cart.productVariantId}>
                <Box className={styles.cartItem}>
                  {/* Product Image */}
                  <Box className={styles.imageWrapper}>
                    <img
                      src={cart.image}
                      alt={cart.name}
                      sizes="(max-width: 600px) 72px, 90px"
                      className={styles.productImage}
                    />
                  </Box>

                  {/* Product Information */}
                  <Box className={styles.productInfo}>
                    {/* Name + Price */}
                    <Box className={styles.namePrice}>
                      <Typography className={styles.productName}>
                        {cart.name}
                      </Typography>

                      <Typography className={styles.productPrice}>
                        ৳ {Number(cart.price).toLocaleString()}
                      </Typography>
                    </Box>

                    {/* Color */}
                    <Typography className={styles.productColor}>
                      {cart.color},
                    </Typography>

                    {/* Size */}
                    <Typography className={styles.productSize}>
                      Size: {cart.size}
                    </Typography>

                    {/* Bottom Action */}
                    <Box className={styles.bottomRow}>
                      {/* Quantity */}

                      <Box className="flex-start gap-1 align-center">
                        <Typography className={styles.productSize}>
                          Qty:{" "}
                        </Typography>
                        <Box className={styles.quantityBox}>
                          <IconButton
                            size="small"
                            className={styles.quantityButton}
                            onClick={() => decrement(cart.productVariantId)}
                          >
                            <RemoveIcon className={styles.quantityIcon} />
                          </IconButton>

                          <Typography className={styles.quantity}>
                            {cart.quantity}
                          </Typography>

                          <IconButton
                            size="small"
                            className={styles.quantityButton}
                            onClick={() => increment(cart.productVariantId)}
                          >
                            <AddIcon className={styles.quantityIcon} />
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Remove */}
                      <Button
                        variant="text"
                        color="inherit"
                        className={styles.removeButton}
                        onClick={() =>
                          dispatch(
                            removeCart({
                              productVariantId: cart.productVariantId,
                            }),
                          )
                        }
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>

                <Divider className={styles.divider} />
              </React.Fragment>
            ))}
          </>
        ) : (
          <Typography className="heading">
            You have no items in your cart.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default CartIndex;
