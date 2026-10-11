"use client";

import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

type Props = {
  handleDrawerToggle: () => void;
};

const Navbar = ({ handleDrawerToggle }: Props) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const settings = ["Logout"];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      {/* Top NaV */}
      <AppBar
        color="secondary"
        position="sticky"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Box sx={{ px: { xs: 2, md: 4 } }}>
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }} className="flex-start gap-2">
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  px: 0,
                }}
              >
                <MenuIcon />
              </IconButton>

              <img src="/logos/logoBlack.svg" alt="logo" width={120} />
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} disableRipple>
                  <Typography component="span" sx={{ fontSize: "0.875rem" }}>
                    Admin User
                  </Typography>
                  <ArrowDropDownCircleOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </>
  );
};

export default Navbar;
