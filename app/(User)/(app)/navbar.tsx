"use client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import XIcon from "@mui/icons-material/X";
import { Box, Container, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useRef } from "react";

import "./navbar.scss";
import Link from "next/link";
import { useAppSelector } from "@/store/store";
import { selectAllCarts } from "@/store/slices/CartSlice";
import BaseDrawer, { DrawerRef } from "@/componentsBase/Drawer/BaseDrawer";
import CartIndex from "../components/Cart/CartIndex";
import CartSummary from "../components/Cart/CartSummary";
import { useRouter } from "next/navigation";
type Props = {};

const navItems = [
  {
    title: "Men",
    url: "/products?gender=Male",
  },

  {
    title: "Women",
    url: "/products?gender=Female",
  },
];

const Navbar = (props: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const router = useRouter();
  const drawerRef = useRef<DrawerRef>(null);
  const carts = useAppSelector(selectAllCarts);

  const handleDrawerToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileOpen((prevState) => !prevState);
  };

  console.log(carts, "cart nab");

  const importantLinks = (
    <>
      <IconButton
        color="inherit"
        component="a"
        href="https://www.facebook.com"
        target="_blank"
      >
        <FacebookIcon />
      </IconButton>

      <IconButton
        color="inherit"
        component="a"
        href="https://www.instagram.com"
        target="_blank"
      >
        <InstagramIcon />
      </IconButton>

      <IconButton
        color="inherit"
        component="a"
        href="https://x.com"
        target="_blank"
      >
        <XIcon />
      </IconButton>

      <IconButton
        color="inherit"
        onClick={() => drawerRef.current?.toggleDrawer()}
      >
        <Box className="cart-icon">
          <ShoppingBagOutlinedIcon />
          <small className="cart-badge">{carts.length}</small>
        </Box>
      </IconButton>

      <IconButton color="inherit">
        <AccountCircleOutlinedIcon />
      </IconButton>
    </>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} className="drawerInner">
      <Box>
        <Box
          sx={{
            position: "relative",
          }}
        >
          <Typography variant="h6" sx={{ my: 2 }}>
            ShoeStore
          </Typography>

          <IconButton
            color="primary"
            onClick={handleDrawerToggle}
            className="closeIcon"
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemText primary={item.title} sx={{ textAlign: "center" }}>
                <Link key={item.title} href={item.url}>
                  {item.title}
                </Link>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="mobileLinks">{importantLinks}</Box>
    </Box>
  );

  return (
    <>
      {/* cart drawer */}

      <BaseDrawer ref={drawerRef} title="Shopping Bag" position="right">
        <Stack
          direction={"column"}
          sx={{
            height: "90vh",
            justifyContent: "space-between",
          }}
        >
          <CartIndex />
          <Box>
            <CartSummary
              handleAction={() => {
                router.push("/checkout");
                drawerRef.current?.toggleDrawer();
              }}
            />
          </Box>
        </Stack>
      </BaseDrawer>

      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, pl: 4, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Container maxWidth="xl">
            <Stack
              direction={"row"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={"/logos/logoWhite.svg"}
                width={"120px"}
                height={"50px"}
              />
              {/* <Link href={"/"}> ShoeStore</Link> */}

              <Box
                sx={{ display: { xs: "none", sm: "flex" } }}
                className="gap-5"
              >
                {navItems.map((item) => (
                  <Link key={item.title} href={item.url}>
                    {item.title}
                  </Link>
                ))}
              </Box>

              <Box sx={{ display: { sm: "flex", xs: "none" }, gap: 2 }}>
                {importantLinks}
              </Box>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      {/* Mobile drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Navbar;
