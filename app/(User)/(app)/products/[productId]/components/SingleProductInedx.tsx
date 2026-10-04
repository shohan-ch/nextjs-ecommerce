"use client";

import { Box, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ImageContainer from "./ImageContainer";
import ProductDetails from "./ProductDetails";
import ProductsCarousel from "@/app/(User)/components/ProductsCarousel/ProductsCarousel";
import { useParams } from "next/navigation";
import { productsDummyData } from "@/data/products";

type Details = {
  productId: number;
  productVariantId: number;
  name: string;
  price: number;
  description: string;
  colors: string[];
  sizes: any;
  image: string;
};

type ProductVarientType = {
  id: number;
  sku: string;
  color: string;
  images: string[];
  videos: string[];
  sizes: any;
};

const likeProducts = [
  {
    id: 1,
    name: "Nike Air Max 1",
    image:
      "https://storage.apex4u.com/3c487e39-46f7-402d-ab7a-4e04521a4a93.JPG",
    price: 150.0,
  },
  {
    id: 2,
    name: "Adidas Ultraboost 2",
    image:
      "https://storage.apex4u.com/b677793a-195c-4825-aae4-8ed1ae9b819a.jpg",
    price: 180.0,
  },
  {
    id: 3,
    name: "Puma RS-X 3",
    image:
      "https://storage.apex4u.com/3d712473-242e-44d0-960b-fc0227101d87.jpg",
    price: 120.0,
  },
  {
    id: 4,
    name: "Converse Chuck 4",
    image:
      "https://storage.apex4u.com/4b3afeee-c4bb-43ba-9028-f060e45766a0.JPG",
    price: 70.0,
  },
  {
    id: 5,
    name: "Bengali shoes 5",
    image:
      "https://storage.apex4u.com/187fff86-38fc-4565-91ce-50ff267738d5.jpg",
    price: 99.0,
  },
  {
    id: 6,
    name: "Bengali shoes6",
    image:
      "https://storage.apex4u.com/c6678d1f-ee63-44ed-a3ad-f7d03b8ca6bc.JPG",
    price: 199.0,
  },
  {
    id: 7,
    name: "Zuqo Men 7",
    price: 1500,
    image: "https://m.media-amazon.com/images/I/81TnPk42c5L._AC_SY550_.jpg",
  },
];

const SingleProductInedx = () => {
  const { productId } = useParams();
  const product = productsDummyData.find((f) => f.id == Number(productId))!;
  console.log(productId, "pp");

  const [media, setMedia] = React.useState<string[]>([
    ...product.productVariants[0].images,
    ...product.productVariants[0].videos,
  ]);

  let colors = product.productVariants.flatMap((v) => v.color);
  const [details, setDetails] = React.useState<Details>({
    productId: product.id as any,
    productVariantId: product.productVariants[0].id,
    name: product.name,
    price: product.price,
    description: product.description,
    colors: colors,
    sizes: product.productVariants[0].sizes,
    image: product.productVariants[0].images[0],
  });

  const changeProductByColor = (color: string) => {
    const selectedVariant: ProductVarientType = product.productVariants.find(
      (f) => f.color.toLowerCase() === color.toLowerCase(),
    )!;
    setMedia([...selectedVariant.images, ...selectedVariant.videos]);
    setDetails({
      ...details,
      sizes: selectedVariant.sizes,
      productVariantId: selectedVariant.id,
      image: selectedVariant.images[0],
    });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={7}>
          {/* Image containert */}
          <Grid size={{ xs: 12, sm: 6, lg: 7 }}>
            <ImageContainer media={media} />
          </Grid>
          {/*Product details*/}
          <Grid size={{ xs: 12, sm: 6, lg: 5 }}>
            <ProductDetails
              changedBycolor={changeProductByColor}
              details={details}
            />
          </Grid>
        </Grid>
        <Box className="pt-7">
          <ProductsCarousel title="You may also like" products={likeProducts} />
        </Box>
      </Container>
    </>
  );
};

export default SingleProductInedx;
