"use client";

import { Box, SxProps, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Navbar from "./navbar";
import SideBar from "./sideBar";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const xsBreakPoint = useMediaQuery(theme.breakpoints.only("xs"));
  const lgBreakPoint = useMediaQuery(theme.breakpoints.only("sm"));
  const isSmallScreen = xsBreakPoint || lgBreakPoint;
  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const drawerWidth = "200";
  console.log(isSmallScreen, "parent");

  return (
    <>
      <Navbar handleDrawerToggle={handleDrawer} />
      <SideBar
        isSmallScreen={isSmallScreen}
        open={open}
        handleToggle={handleDrawer}
        drawerWidth={drawerWidth}
      />
      <Box
        className="adminWrapper"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            ...contentWrapper,
            ml: {
              xs: 2,
              md: `calc(${drawerWidth}px + 32px)`,
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default layout;

const contentWrapper: SxProps = {
  flex: 1,
  minWidth: 0,
  minHeight: {
    xs: "calc(100vh - 88px)",
    md: "calc(100vh - 96px)",
  },
  boxSizing: "border-box",
  mr: { xs: 2, md: 4 },
  mt: 4,
  background: "#FFFF",
  p: { xs: 2, sm: 3, md: 4 },
  borderRadius: 1,
};
