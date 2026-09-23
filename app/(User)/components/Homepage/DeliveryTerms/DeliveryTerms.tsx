"use client";

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "./DeliveryTerms.module.scss";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import UndoIcon from "@mui/icons-material/Undo";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
type Props = {};

const items = [
  {
    title: "Fast Delivery",
    subTitle: "Dhaka 1–2 days · Outside Dhaka around 3 days",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    title: "3-Day Exchange",
    subTitle: "Easy exchange support after delivery",
    icon: <UndoIcon />,
  },
  {
    title: "Product Care Support",
    subTitle: "Support for pasting, sewing, sole and padding issues",
    icon: <VerifiedUserOutlinedIcon />,
  },
  {
    title: "Cash on Delivery",
    subTitle: "Available across Bangladesh",
    icon: <StorefrontOutlinedIcon />,
  },
];

const DeliveryTerms = (props: Props) => {
  return (
    <Box
      sx={{
        // mb: "-20px",
        mt: 5,
        borderTop: {
          xs: "none",
          md: "1px solid #E5E5E5",
        },
        mx: {
          // md: "-20px",
          xs: 0,
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container className={styles.gridWrapper}>
          {items.map((i) => (
            <>
              <Grid key={i.title} size={{ xs: 6, md: 3 }}>
                <Stack direction="row" spacing={1}>
                  <Box className={styles.icon}>{i.icon}</Box>
                  <Box>
                    <Typography
                      variant="h5"
                      className="pb-4"
                      sx={{
                        fontSize: {
                          xs: "14px",
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
