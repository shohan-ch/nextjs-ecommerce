"use client";
import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import CopyrightIcon from "@mui/icons-material/Copyright";
type Props = {};

const Footer = (props: Props) => {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",

        "& .MuiTypography-body2": {
          fontSize: 17,
          pb: 1,
        },
        "& .MuiLink-root": {
          fontSize: 17,
          fontWeight: 400,
          color: "text.secondary",
          width: "fit-content",
        },
        // px: "5px",
      }}
    >
      <Container maxWidth="xl" className="pt-17 pb-10">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography className="pb-4" variant="h6" gutterBottom>
              We are ShoeStore
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.8,
                maxWidth: 400,
              }}
            >
              We are ShoeStore, your trusted destination for quality and stylish
              footwear. We provide comfortable and fashionable shoes for every
              occasion.
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom>
              Help Center
            </Typography>

            <Stack direction={"column"} spacing={3} className="pt-4">
              <MuiLink component={Link} href="/counts" underline="hover">
                Refund
              </MuiLink>

              <MuiLink component={Link} href="/counts" underline="hover">
                Refund Policy
              </MuiLink>
            </Stack>
          </Grid>

          {/* Column 3 */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" gutterBottom className="pb-4">
              Contact
            </Typography>

            <Typography variant="body2">
              <b>Customer Support:</b> 01777746112
            </Typography>

            <Typography variant="body2">
              <b>Email: </b>
              support@shoestore.com
            </Typography>
          </Grid>
        </Grid>

        <Stack
          direction="row"
          className="pt-7"
          sx={{
            justifyContent: {
              xs: "start",
              sm: "center",
            },
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                textAlign: {
                  xs: "start",
                  sm: "center",
                },
              }}
              className="gap-1 align-center"
            >
              <CopyrightIcon /> ShoeStore {currentYear.toString()}. All Rights
              Reserved
            </Typography>

            <Image
              alt="logo"
              src="/logos/footer_logos.png"
              width={350}
              height={80}
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
