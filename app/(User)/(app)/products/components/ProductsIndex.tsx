"use client";

import React, { useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import SingleProduct from "@/app/(User)/components/Products/SingleProduct";
import BaseCheckbox from "@/componentsBase/Checkbox/BaseCheckbox";
import BaseRangeSlider from "@/componentsBase/RangeSlider/BaseRangeSlider";

type Props = {};

const products = [
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

const categories = [
  {
    id: 1,
    name: "Sneaker",
  },
  {
    id: 2,
    name: "Casual",
  },
  {
    id: 3,
    name: "Sandal",
  },
  {
    id: 4,
    name: "Half Shoes",
  },
];
const brands = [
  {
    id: 1,
    name: "Adidas",
  },
  {
    id: 2,
    name: "Nike",
  },
  {
    id: 3,
    name: "Polo",
  },
];

type ArrayFilterKeys = "categoryIds" | "brandIds";
type Filter = {
  categoryIds: string[];
  brandIds: string[];
  priceRange: number[];
  sizeId: string;
  colorId: string;
};

const ProductsIndex = (props: Props) => {
  const [filter, setFilter] = useState<Filter>({
    categoryIds: [],
    brandIds: [],
    priceRange: [700, 1500],
    sizeId: "",
    colorId: "",
  });
  const handleCheckboxChange =
    (type: ArrayFilterKeys) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (e.target.checked && !filter[type].includes(value)) {
        setFilter((prev) => ({ ...prev, [type]: [...prev[type], value] }));
      } else {
        const filterUnchecked = filter[type].filter((f) => f !== value);
        setFilter((prev) => ({ ...prev, [type]: filterUnchecked }));
      }
    };

  const handelRangeChange = (e: Event, newValue: number[]) => {
    setFilter((prev) => ({ ...prev, priceRange: newValue }));
  };

  const resetFilter = () => {
    setFilter({
      categoryIds: [],
      brandIds: [],
      priceRange: [700, 1500],
      sizeId: "",
      colorId: "",
    });
  };

  console.log(filter, "ff");

  return (
    <>
      <Container maxWidth="xl" className="pt-4 pb-4">
        <Grid container columnSpacing={7}>
          {/* Filter section */}
          <Grid
            size={{ md: 2 }}
            sx={{
              borderRight: "1px solid",
              borderColor: "secondary.dark",
              display: { xs: "none", md: "block" },
            }}
          >
            <Stack direction={"row"} className="flex-between pb-2">
              <Typography variant="h5" className="heading">
                Filter
              </Typography>
              <Button
                size="small"
                sx={{ fontWeight: 600, textTransform: "capitalize" }}
                onClick={resetFilter}
              >
                Clear All
              </Button>
            </Stack>

            <BaseCheckbox
              items={categories}
              title="Category"
              handleChange={handleCheckboxChange("categoryIds")}
              checkedItems={filter.categoryIds}
            />
            <Box className="pr-5 pt-5">
              <BaseRangeSlider
                values={filter.priceRange}
                handleChange={handelRangeChange}
              />
            </Box>
          </Grid>

          {/* Products section */}
          <Grid size={{ xs: 12, md: 10 }}>
            <Typography variant="h5" className="pb-5">
              Product page
            </Typography>
            <Grid
              container
              spacing={2}
              rowSpacing={3}
              columns={{ xs: 12, xl: 10 }}
            >
              {products.length > 0 &&
                products.map((p, index) => (
                  <Grid
                    key={index}
                    size={{
                      xs: 6,
                      sm: 4,
                      lg: 3,
                      xl: 2,
                    }}
                  >
                    <SingleProduct product={p} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProductsIndex;
