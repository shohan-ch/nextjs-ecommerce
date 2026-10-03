import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import React, { useImperativeHandle } from "react";

export type DrawerRef = {
  toggleDrawer: () => void;
};
type Props = {
  children: React.ReactNode;
  ref: any;
  width?: string;
  title?: string;
};

const BaseDrawer = ({ children, ref, width = "100%", title }: Props) => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleDrawer: toggleDrawer,
    };
  });

  return (
    <>
      <Drawer
        open={open}
        onClose={toggleDrawer}
        // slotProps={{
        //   paper: {
        //     sx: {
        //       width: width,
        //     },
        //   },
        // }}
      >
        <Box sx={{ pl: 1.5, pr: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: title ? "space-between" : "flex-end",
              alignItems: "center",
              py: 1,
            }}
          >
            {title && (
              <Typography variant="h4" className="heading">
                {title}{" "}
              </Typography>
            )}

            <IconButton aria-label="close" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Box>
      </Drawer>
    </>
  );
};

export default BaseDrawer;
