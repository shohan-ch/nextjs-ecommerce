"use client";
import CartIndex from "@/app/(User)/components/Cart/CartIndex";
import CartSummary from "@/app/(User)/components/Cart/CartSummary";
import { selectAllCarts } from "@/store/slices/CartSlice";
import { useAppSelector } from "@/store/store";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import CheckOutForm from "./CheckOutForm";

import SectionTitle from "@/componentsBase/UI/SectionTitle";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";

import styles from "./CheckoutIndex.module.scss";

type Props = {};

const CheckoutIndex = (props: Props) => {
  const formRef = useRef<any>(null);

  const carts = useAppSelector(selectAllCarts);

  const formSubmit = async (totalPrice: number) => {
    console.log(carts, "allcarts");
    console.log(totalPrice, "total");
    const data = await formRef.current?.submitForm();
    if (!data) {
      return;
    }
    console.log(data, "fresh data");
  };

  const cartDetails = (
    <Stack direction={"column"} divider={<hr />} sx={{ width: "100%" }}>
      <Typography variant="h3" className="heading">
        {" "}
        Delivery Items ({carts.length})
      </Typography>
      <Box>
        <CartIndex />
      </Box>
      <CartSummary btnText="Complete Order" handleAction={formSubmit} />
    </Stack>
  );

  return (
    <>
      <Container maxWidth="lg">
        <SectionTitle title="Order Summary" />

        {/* Small device Accordion */}
        <Accordion className={styles.mobileOrderSummary}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel1-content`}
            id={`panel1-header`}
          >
            <Typography component="h3">Order Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>{cartDetails}</AccordionDetails>
        </Accordion>

        <Grid container spacing={10}>
          {/* Form section */}
          <Grid size={{ xs: 12, md: 7 }}>
            <CheckOutForm ref={formRef} />

            <Button
              className={styles.completeOrderButton}
              endIcon={<ChevronRightIcon />}
              variant="contained"
              color="primary"
              fullWidth
              // onClick={() => handleAction(total)}
            >
              Complete Order
            </Button>
          </Grid>

          {/* cart section */}
          <Grid className={styles.desktopCart} size={{ xs: 12, md: 5 }}>
            <Stack direction={"column"} divider={<hr />}>
              <Typography variant="h3" className="heading">
                {" "}
                Delivery Items ({carts.length})
              </Typography>

              <Box className={styles.cartScroll}>
                <CartIndex />
              </Box>

              <CartSummary btnText="Complete Order" handleAction={formSubmit} />
            </Stack>
          </Grid>
        </Grid>

        {/* <button onClick={formSubmit}>Submit </button> */}
      </Container>
    </>
  );
};

export default CheckoutIndex;
