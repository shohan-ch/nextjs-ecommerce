"use client";

import AutorenewIcon from "@mui/icons-material/Autorenew";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { Container, Grid } from "@mui/material";
import SinglePolicy from "./SinglePolicy";

const policyList = [
  {
    title: "Free Shipping",
    description: "On orders over 1000 TK",
    icon: <LocalShippingOutlinedIcon />,
  },
  {
    title: "Easy Returns",
    description: "7 days return policy",
    icon: <AutorenewIcon />,
  },
  {
    title: "Secure Payment",
    description: "100% Cash on Delivery",
    icon: <SecurityIcon />,
  },
  {
    title: "24/7 Support",
    description: "We're here to help",
    icon: <SupportAgentIcon />,
  },
];

type Props = {};

const Policy = (props: Props) => {
  return (
    <>
      <Grid
        container
        spacing={{
          xs: 1,
          sm: 2,
        }}
        className="pt-6"
      >
        {policyList.map((l: any, index) => (
          <Grid
            key={index}
            size={{ xs: 4, sm: 3 }}
            sx={{
              display: {
                xs: index == policyList.length - 1 ? "none" : "block",
                sm: "block",
              },
            }}
          >
            <SinglePolicy policy={l} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Policy;
