// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Stack,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import SingleCategory from "./SingleCategory";
// import Link from "next/link";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

// type Props = {};

// const categories = [
//   {
//     name: "Sneakers",
//     slug: "sneakers",
//     image:
//       "https://zuqo.shop/cdn/shop/files/DSC00076_6f0c0019-566b-4c88-baf6-6f93a7d86caf.jpg?v=1767545590&width=960",
//   },
//   {
//     name: "Half Shoes",
//     slug: "half-shoes",
//     image:
//       "https://zuqo.shop/cdn/shop/files/Olive_Coffee_Sky_Blue_b6693d21-7bd3-475b-a724-61b64eb53fb9.png?v=1788956389&width=1200",
//   },
//   {
//     name: "Sandals & Slides",
//     slug: "sandals-slides",
//     image:
//       "https://zuqo.shop/cdn/shop/files/Untitled_design_4_copy.png?v=1788942738&width=1200",
//   },
//   {
//     name: "Loafers & Chelsea Boots",
//     slug: "loafers-chelsea-boots",
//     image:
//       "https://zuqo.shop/cdn/shop/files/Verona_Esprsso_Price_3500_Tk_Upper_Suede_Leather_Sole_Imported_Crepe_Sole_10_681c09a7-7677-4b50-a2b7-ad78723dba90.png?v=1788942784&width=960",
//   },
// ];

// const HomeCategory = (props: Props) => {
//   return (
//     <>
//       <Box className="pt-7 ">
//         <Stack
//           className="pb-3"
//           direction={"row"}
//           sx={{ justifyContent: "space-between", alignItems: "center" }}
//         >
//           <Typography variant="h6" className="heading">
//             Shop By Category
//           </Typography>

//           <Link href="/products" className="flex-center arrowLinkBtn">
//             <Typography variant="body2">View all</Typography>
//             <ArrowRightAltIcon />
//           </Link>
//         </Stack>

//         <Stack
//           direction={"row"}
//           spacing={2}
//           sx={{
//             overflowX: "scroll",
//             width: "100%",
//           }}
//           className="flex-center"
//         >
//           {categories.length > 0 &&
//             categories.map((c) => (
//               <React.Fragment key={c.slug}>
//                 <SingleCategory category={c} />
//               </React.Fragment>
//             ))}
//         </Stack>
//       </Box>
//     </>
//   );
// };

// export default HomeCategory;

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import SingleCategory from "./SingleCategory";
import Link from "next/link";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

type Props = {};

const categories = [
  {
    name: "Sneakers",
    slug: "sneakers",
    image:
      "https://zuqo.shop/cdn/shop/files/DSC00076_6f0c0019-566b-4c88-baf6-6f93a7d86caf.jpg?v=1767545590&width=960",
  },
  {
    name: "Half Shoes",
    slug: "half-shoes",
    image:
      "https://zuqo.shop/cdn/shop/files/Olive_Coffee_Sky_Blue_b6693d21-7bd3-475b-a724-61b64eb53fb9.png?v=1788956389&width=1200",
  },
  {
    name: "Sandals & Slides",
    slug: "sandals-slides",
    image:
      "https://zuqo.shop/cdn/shop/files/Untitled_design_4_copy.png?v=1788942738&width=1200",
  },
  {
    name: "Loafers & Chelsea Boots",
    slug: "loafers-chelsea-boots",
    image:
      "https://zuqo.shop/cdn/shop/files/Verona_Esprsso_Price_3500_Tk_Upper_Suede_Leather_Sole_Imported_Crepe_Sole_10_681c09a7-7677-4b50-a2b7-ad78723dba90.png?v=1788942784&width=960",
  },
];

const colors = ["#f3eee7", "#eee4d6", "#f6ecec", "#80808014"];

const HomeCategory = (props: Props) => {
  return (
    <Box
      className="pt-7"
      sx={{
        marginRight: {
          xs: "-35px",
          sm: "0",
        },
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        className="pb-3"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" className="heading">
          Shop By Category
        </Typography>

        <Link href="/products" className="flex-center arrowLinkBtn">
          <Typography variant="body2">View all</Typography>
          <ArrowRightAltIcon />
        </Link>
      </Stack>

      {/* Categories */}
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          overflowY: "hidden",

          // Important for mobile horizontal scrolling
          WebkitOverflowScrolling: "touch",

          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Stack
          direction="row"
          spacing={{
            xs: 1.5,
            sm: 2,
            md: 2.5,
          }}
          sx={{
            width: "max-content",
            minWidth: "100%",
            pb: 1,
          }}
          className="flex-center"
        >
          {categories.map((category, index) => (
            <SingleCategory
              key={category.slug}
              category={{ ...category, cardBg: colors[index] || colors[0] }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default HomeCategory;
