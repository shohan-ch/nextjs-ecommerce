"use client";

import { Box, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import ImageContainer from "./ImageContainer";
import ProductDetails from "./ProductDetails";
import ProductsCarousel from "@/app/(User)/components/ProductsCarousel/ProductsCarousel";

const product = {
  id: 1,
  name: "Zuqo Men's Half Shoe - Black Canvas",
  price: 1500,
  varients: [
    {
      sku: "000001",
      color: "Black",
      images: [
        "https://zuqo.shop/cdn/shop/files/Untitled_design_5892ef80-c5ac-4cf0-9408-29777e079781.png?v=1772969048&width=324",
        "https://zuqo.shop/cdn/shop/files/Untitled_design_9_c586fe91-b8a7-40e3-83a9-5a39b8d30472.png?v=1786300710&width=1946",
        "https://zuqo.shop/cdn/shop/files/Untitled_design_8_56e88b71-b230-4d97-b236-205534d6d77c.png?v=1786300711&width=324",
      ],
      videos: [
        "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/fb9588c5-0699-4117-9f35-a8bd67a29185/default.jobtemplate.mp4.480.mp4",
      ],
      sizes: {
        39: 1,
        40: 1,
        41: 1,
        42: 1,
        43: 1,
        44: 1,
        45: 3,
      },
    },
    {
      sku: "000002",
      color: "White",
      images: [
        "https://m.media-amazon.com/images/I/81TnPk42c5L._AC_SY550_.jpg",
        "https://m.media-amazon.com/images/I/71C1TUBF+WL._AC_SY550_.jpg",
        "https://m.media-amazon.com/images/I/71cx9VYbYAL._AC_SY550_.jpg",
      ],
      videos: [
        "https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-east-1-prod/fb9588c5-0699-4117-9f35-a8bd67a29185/default.jobtemplate.mp4.480.mp4",
      ],
      sizes: {
        39: 0,
        40: 0,
        41: 0,
        42: 0,
        43: 2,
        44: 3,
        45: 0,
      },
    },
  ],
  description: `  
<b> Zuqo Half Shoe – Black Canvas </b>
<p> 
গরমের দিনে sneaker-এর smart বিকল্প — Zuqo Half Shoe তৈরি canvas fabric upper দিয়ে, যা breathable ও lightweight। EVA sole দেয় soft, cushioned step, যা সারাদিনের হাঁটাচলায় আরামদায়ক রাখে পা।
Quick slip-on style, কোনো lace ঝামেলা নেই — বাসা থেকে বাইরের কাজ, সবখানেই easy, everyday comfort।
Key Features:
Canvas fabric upper — breathable, lightweight
EVA sole — soft cushioning, flexible
Slip-on design — quick, hassle-free wear
Regular fit — true to size
Best For: Daily wear, home, outdoor errands
Water Resistant: হালকা পানির সংস্পর্শে সমস্যা নেই, তবে ভারী বৃষ্টিতে এড়িয়ে চলা ভালো (canvas fabric)
অনুগ্রহ করে লক্ষ্য করুন: প্রোডাকশন, ম্যাটেরিয়াল, বা লাইটিং-এর কারণে actual product-এর কালার, সোল টেক্সচার বা ফিনিশিং-এ ছবির তুলনায় সামান্য পার্থক্য হতে পারে। তবে প্রোডাক্টের কোয়ালিটি, কমফোর্ট ও স্থায়িত্ব একই থাকবে। কাস্টমার সন্তুষ্ট না হলে exchange, return বা refund নেওয়ার সুযোগ সবসময় থাকবে।
Country of Origin: Made in Bangladesh
Package Contents: 1x Half Shoe Pair (Box সহ).
<b>
Gender: Men's
</b>
<br>
Warranty: Sole – 6 মাস | Stitching & Materials – 1 মাস
Return/Exchange Policy: ডেলিভারি নেওয়ার সময় ডেলিভারিম্যানের সামনে প্রোডাক্ট চেক করে নিন। পছন্দ না হলে তখনই ফেরত দেওয়া যাবে (ডেলিভারি চার্জ প্রযোজ্য)। ডেলিভারির পর কোনো সমস্যা পেলে ৩ দিনের মধ্যে আমাদের জানাতে হবে — এর পরে exchange বা return applicable হবে না।
Available Sizes: 39–44
</p>
`,
};

type Details = {
  name: string;
  price: number;
  description: string;
  colors: string[];
  sizes: any;
};

type Varients = {
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
  const [media, setMedia] = React.useState<string[]>([
    ...product.varients[0].images,
    ...product.varients[0].videos,
  ]);

  let colors = product.varients.flatMap((v) => v.color);
  const [details, setDetails] = React.useState<Details>({
    name: product.name,
    price: product.price,
    description: product.description,
    colors: colors,
    sizes: product.varients[0].sizes,
  });

  const changeProductByColor = (color: string) => {
    const selectVarient: Varients = product.varients.find(
      (f) => f.color.toLowerCase() === color.toLowerCase(),
    )!;
    setMedia([...selectVarient.images, ...selectVarient.videos]);
    setDetails({ ...details, sizes: selectVarient.sizes });
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container spacing={7}>
          <Grid size={{ xs: 12, sm: 6, lg: 7 }}>
            <ImageContainer media={media} />
          </Grid>
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
