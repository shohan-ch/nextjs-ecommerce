"use client";
import { Container, Typography } from "@mui/material";
import React from "react";

type Props = {};

const CheckouIndex = (props: Props) => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h3" className="heading">
          Checkout page
        </Typography>
      </Container>
    </>
  );
};

export default CheckouIndex;
