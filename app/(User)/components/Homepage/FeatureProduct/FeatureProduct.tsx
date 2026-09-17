import {
  Box,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import SingleProduct from "../../Products/SingleProduct";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Link from "next/link";
import MuiLink from "@mui/material/Link";

type Props = {};

const products = [
  {
    id: 1,
    name: "Nike Air Max 270",
    image:
      "https://storage.apex4u.com/3c487e39-46f7-402d-ab7a-4e04521a4a93.JPG",
    price: 150.0,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 22",
    image:
      "https://storage.apex4u.com/b677793a-195c-4825-aae4-8ed1ae9b819a.jpg",
    price: 180.0,
  },
  {
    id: 3,
    name: "Puma RS-X3",
    image:
      "https://storage.apex4u.com/3d712473-242e-44d0-960b-fc0227101d87.jpg",
    price: 120.0,
  },
  {
    id: 4,
    name: "Converse Chuck Taylor",
    image:
      "https://storage.apex4u.com/4b3afeee-c4bb-43ba-9028-f060e45766a0.JPG",
    price: 70.0,
  },
  {
    id: 5,
    name: "Bengali shoes",
    image:
      "https://storage.apex4u.com/187fff86-38fc-4565-91ce-50ff267738d5.jpg",
    price: 99.0,
  },
  {
    id: 6,
    name: "Bengali shoes2",
    image:
      "https://storage.apex4u.com/c6678d1f-ee63-44ed-a3ad-f7d03b8ca6bc.JPG",
    price: 199.0,
  },
];

const FeatureProduct = (props: Props) => {
  return (
    <>
      <Box className="pt-8">
        <Stack
          className="pb-3"
          direction={"row"}
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: {
                sm: 18,
                xs: 14,
              },
              fontWeight: 600,
            }}
          >
            Feature Products
          </Typography>

          <Link href="/products" className="flex-center arrowLinkBtn">
            <Typography variant="body2">View all</Typography>
            <ArrowRightAltIcon />
          </Link>
          {/* <IconButton color="primary">
          </IconButton> */}
        </Stack>
        <Grid
          container
          spacing={2}
          rowSpacing={{ xs: 2, md: 4, lg: 2 }}
          columnSpacing={{ xs: 2, md: 4, lg: 2 }}
        >
          {products.length > 0 &&
            products.map((p: any) => (
              <Grid
                key={p.name}
                size={{
                  xs: 6,
                  sm: 4,
                  md: 3,
                  lg: 2,
                }}
              >
                <SingleProduct product={p} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default FeatureProduct;
