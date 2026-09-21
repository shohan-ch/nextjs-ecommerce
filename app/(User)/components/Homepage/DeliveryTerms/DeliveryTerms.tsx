"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./DeliveryTerms.module.css";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import UndoIcon from "@mui/icons-material/Undo";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
type Props = {};

const items = [
  {
    title: "Fast Delivery",
    subTitle: "Dhaka 1–2 days · Outside Dhaka around 3 days",
    icon: (
      <DeliveryDiningIcon
        sx={{
          fontSize: {
            xs: 24,
            sm: 32,
          },
        }}
      />
    ),
  },
  {
    title: "3-Day Exchange",
    subTitle: "Easy exchange support after delivery",
    icon: (
      <UndoIcon
        sx={{
          fontSize: {
            xs: 24,
            sm: 32,
          },
        }}
      />
    ),
  },
  {
    title: "Product Care Support",
    subTitle: "Support for pasting, sewing, sole and padding issues",
    icon: (
      <VerifiedUserOutlinedIcon
        sx={{
          fontSize: {
            xs: 24,
            sm: 32,
          },
        }}
      />
    ),
  },
  {
    title: "Cash on Delivery",
    subTitle: "Available across Bangladesh",
    icon: (
      <StorefrontOutlinedIcon
        sx={{
          fontSize: {
            xs: 24,
            sm: 32,
          },
        }}
      />
    ),
  },
];

const DeliveryTerms = (props: Props) => {
  return (
    <Box
      sx={{
        mb: "-20px",
        mt: 5,
        borderTop: {
          xs: "none",
          sm: "1px solid #E5E5E5",
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container className={styles.gridWrapper}>
          {items.map((i) => (
            <>
              <Grid key={i.title} size={{ xs: 6, sm: 3 }}>
                <Stack direction="row" spacing={1}>
                  <Box>{i.icon}</Box>
                  <Box>
                    <Typography
                      variant="h5"
                      className="pb-4"
                      sx={{
                        fontSize: {
                          xs: "16px",
                          sm: "19px",
                        },
                      }}
                    >
                      {i.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: {
                          xs: "12px",
                          sm: "16px",
                        },
                        color: "secondary.dark",
                      }}
                    >
                      {i.subTitle}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DeliveryTerms;
