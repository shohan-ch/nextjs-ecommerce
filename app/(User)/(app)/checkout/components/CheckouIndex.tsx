"use client";
import CartIndex from "@/app/(User)/components/Cart/CartIndex";
import CartSummary from "@/app/(User)/components/Cart/CartSummary";
import { Box, Container, Grid, Typography, Stack } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";
import CheckOutForm from "./CheckOutForm";

type Props = {};

const CheckoutIndex = (props: Props) => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" className="heading">
          Checkout page
        </Typography>
        <Grid container>
          <Grid size={{ xs: 12, sm: 7 }}>
            <CheckOutForm />
          </Grid>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Stack direction={"column"} divider={<hr />}>
              <CartIndex />
              <CartSummary />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CheckoutIndex;
