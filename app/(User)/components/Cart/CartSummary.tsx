"use client";

import { selectAllCarts } from "@/store/slices/CartSlice";
import { useAppSelector } from "@/store/store";
import { Stack, Typography, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { usePathname, useRouter } from "next/navigation";
type Props = {};

const CartSummary = React.memo((props: Props) => {
  const router = useRouter();
  const patname = usePathname();
  const carts = useAppSelector(selectAllCarts);
  let subtotal = 0;
  let shippingPrice = 90;
  carts.forEach((c) => {
    subtotal += Number(c.price) * c.quantity;
  });
  let total = subtotal + shippingPrice;

  return (
    <>
      {carts.length > 0 && (
        <>
          <Stack direction={"row"} className="flex-between">
            <Typography
              sx={{
                "& > span": {
                  fontSize: "12px !important",
                  color: "text.secondary",
                },
              }}
              className="heading"
              variant="h3"
            >
              Subtotal <span> {carts.length} Items </span>
            </Typography>

            <Typography variant="h3" className="heading">
              ৳ {subtotal}
            </Typography>
          </Stack>
          <Stack direction={"row"} className="flex-between mt-2 mb-2">
            <Typography className="subHeading" variant="h6">
              Shipping Cost
            </Typography>

            <Typography variant="h3" className="subHeading">
              ৳ {shippingPrice}
            </Typography>
          </Stack>
          <Divider />{" "}
          <Stack direction={"row"} className="flex-between mt-2">
            <Typography className="subHeading" variant="h6">
              Total{" "}
            </Typography>

            <Typography variant="h3" className="subHeading">
              ৳ {total}
            </Typography>
          </Stack>
          <Button
            sx={{ mt: 3, fontWeight: 600 }}
            endIcon={<ChevronRightIcon />}
            variant="contained"
            color="primary"
            fullWidth
          >
            Buy Now
          </Button>
        </>
      )}
    </>
  );
});

export default CartSummary;
