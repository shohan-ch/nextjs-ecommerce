"use client";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import XIcon from "@mui/icons-material/X";
import { Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

import "./navbar.scss";
type Props = {};

const navItems = [
  {
    title: "Men",
    url: "/men",
  },

  {
    title: "Women",
    url: "/women",
  },
];

const Navbar = (props: Props) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileOpen((prevState) => !prevState);
  };

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

      <IconButton color="inherit">
        <Box className="cart-icon">
          <ShoppingBagOutlinedIcon />
          <small className="cart-badge">1</small>
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
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="mobileLinks">{importantLinks}</Box>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box className="flexWrapper">
            <Typography variant="h6" component="div">
              ShoeStore
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item.title} sx={{ color: "#fff" }}>
                  {item.title}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: { sm: "flex", xs: "none" }, gap: 2 }}>
              {importantLinks}
            </Box>
          </Box>
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
