// import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
// import React from "react";

// type Props = {
//   category: {
//     name: string;
//     image: string;
//     slug: string;
//   };
// };

// const SingleCategory = (props: Props) => {
//   const { category } = props;
//   return (
//     <>
//       <Card
//         sx={{
//           width: 190,
//           height: 250,
//         }}
//       >
//         <Box>
//           <CardMedia
//             component={"img"}
//             image={category.image}
//             sx={{
//               objectFit: "cover",
//             }}
//           ></CardMedia>
//         </Box>

//         <CardContent>
//           <Typography variant="h6">{category.name}</Typography>
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default SingleCategory;

import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

type Props = {
  category: {
    name: string;
    image: string;
    slug: string;
    cardBg: string;
  };
};

const SingleCategory = ({ category }: Props) => {
  return (
    <Card
      sx={{
        width: {
          xs: 168,
          sm: 190,
        },
        height: 250,
        flexShrink: 0,
        overflow: "hidden",
        bgcolor: category.cardBg,
      }}
    >
      <Box sx={{ padding: 0.8, bgcolor: "white" }}>
        <CardMedia
          component="img"
          image={category.image}
          alt={category.name}
          sx={{
            width: "100%",
            objectFit: "cover",
            height: 170,
            borderRadius: 2,
          }}
        />
      </Box>

      <CardContent
        sx={{
          px: {
            xs: 1,
            sm: 1.5,
          },

          py: {
            xs: 3,
            sm: 2.5,
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              xs: "0.8rem",
              sm: "0.9rem",
            },
            fontWeight: 800,
            lineHeight: 1.3,
          }}
        >
          {category.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleCategory;
