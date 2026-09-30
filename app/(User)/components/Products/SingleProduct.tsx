"use client";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {
  product: {
    id: number;
    name: string;
    image: string;
    price: string | number;
  };
};

const SingleProduct = (props: Props) => {
  const { product } = props;

  return (
    <Card
      sx={{
        width: "100%",
        // maxWidth: { xs: "100%", sm: 280 },
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        border: "1px solid transparent",

        "&:hover": {
          border: (theme) => `1px solid ${theme.palette.primary.main}`,
          boxShadow: "none",
          transition: "0.5s",
        },
      }}
    >
      <Link
        href={"/products/" + product.id}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardHeader
          sx={{ p: { xs: 1 } }}
          action={
            <IconButton size="small">
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          }
        />

        <CardMedia
          component="img"
          alt={product.name}
          image={product.image}
          sx={{
            width: "100%",
            height: { xs: 140, sm: 170, md: 194 },
            objectFit: "cover",
          }}
        />

        <CardContent
          sx={{
            p: { xs: 1, sm: 1.5 },
            "&:last-child": {
              pb: {
                xs: 1,
                sm: 1.5,
              },
            },
          }}
        >
          <button className="btn display-none">Buy now</button>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              fontWeight: 600,
            }}
          >
            {product.name}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              color: "text.secondary",
            }}
          >
            {product.price}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default SingleProduct;
