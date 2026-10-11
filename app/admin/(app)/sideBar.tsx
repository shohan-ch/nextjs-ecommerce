import { AppBar, Toolbar, Box, Drawer } from "@mui/material";
import React from "react";

type Props = {
  handleToggle: () => void;
  open: boolean;
  drawerWidth: string;
  isSmallScreen: boolean;
};

const SideBar = ({ open, handleToggle, drawerWidth, isSmallScreen }: Props) => {
  return (
    <>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={open}
        onClose={handleToggle}
      >
        <Box
          sx={{
            width: drawerWidth + "px",
            p: 1,
            boxSizing: "border-box",
          }}
        >
          <Toolbar />
          <h3 onClick={handleToggle}>Side bar</h3>
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
