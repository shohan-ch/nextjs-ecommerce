"use client";

import SingleProduct from "@/app/(User)/components/Products/SingleProduct";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FilterOptionList, { IFilter } from "./FilterOptionList";

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
const sizes = ["39", "40", "41", "42", "43", "44"];

const colors = [
  {
    id: 1,
    name: "Black",
    colorCode: "#000000",
  },
  {
    id: 2,
    name: "White",
    colorCode: "#FFFFFF",
  },
  {
    id: 3,
    name: "Brown",
    colorCode: "#8d2f05",
  },
];

const sortList = [
  {
    name: "Regular",
    value: "regular",
  },
  {
    name: "Price: Low to High",
    value: "low",
  },
  {
    name: "Price: High to Low",
    value: "high",
  },
];
const ProductsIndex = (props: Props) => {
  const [filter, setFilter] = useState<IFilter>({
    categoryIds: [],
    brandIds: [],
    priceRange: [700, 1500],
    size: "",
    colorId: "",
    sortBy: "",
  });

  const resetFilter = () => {
    setFilter({
      categoryIds: [],
      brandIds: [],
      priceRange: [700, 1500],
      size: "",
      colorId: "",
      sortBy: "regular",
    });
  };
  console.log(filter, "filterData");

  return (
    <>
      <Container maxWidth="xl" className="pt-4 pb-4">
        <Grid container columnSpacing={7}>
          {/* Filter section */}
          <Grid
            size={{ md: 2 }}
            sx={{
              borderRight: "1px solid",
              borderColor: "primary.light",
              display: { xs: "none", md: "block" },
            }}
          >
            <Stack direction={"row"} className="flex-between pb-6 pr-1">
              <Typography variant="h5" className="subHeading">
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

            <FilterOptionList
              data={{ categories, sizes, colors }}
              filterData={filter}
              setFilterData={setFilter}
            />
          </Grid>

          {/* Products section */}
          <Grid size={{ xs: 12, md: 10 }}>
            <Stack direction={"row"} className="flex-between pb-6">
              <Typography variant="h5" className=" heading">
                Product page
              </Typography>

              <TextField
                select
                label="Sort By"
                size="small"
                sx={{ minWidth: "140px" }}
                defaultValue={"regular"}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, sortBy: e.target.value }))
                }
              >
                {sortList.map((s) => (
                  <MenuItem key={s.name} value={s.value}>
                    {s.name}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
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
