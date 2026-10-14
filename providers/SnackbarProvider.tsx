"use client";

import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

type SnackType = {
  type: "error" | "success" | "info" | "warning";
  message: string;
};

type SnackbarContextType = {
  open: (type: SnackType) => void;
};

const SnackBarContext = createContext<SnackbarContextType | null>(null);

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<SnackType["type"]>("success");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (type: SnackType) => {
    setOpen(true);
    setMessage(type.message);
    setType(type.type);
  };

  return (
    <>
      <SnackBarContext
        value={{
          open: handleOpen,
        }}
      >
        {children}
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={type || "success"}
          >
            {message}
          </Alert>
        </Snackbar>
      </SnackBarContext>
    </>
  );
};

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  return context;
};

export default SnackbarProvider;
