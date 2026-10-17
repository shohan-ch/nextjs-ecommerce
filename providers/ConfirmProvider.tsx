"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Zoom,
} from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import React, { createContext, useContext, useState } from "react";

type ConfirmOpenType = {
  title: string;
  onOk: () => void;
};

type ConfirmContextType = {
  open: (props: ConfirmOpenType) => void;
  close: () => void;
};

const ConfirmContext = createContext<ConfirmContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const ConfirmProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState<ConfirmOpenType>();

  const handleOpen = (param: ConfirmOpenType) => {
    setOpen(true);
    setModalState(param);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if (modalState?.onOk) {
      modalState.onOk();
    }
  };

  return (
    <>
      <ConfirmContext value={{ open: handleOpen, close: handleClose }}>
        <Dialog
          maxWidth="xs"
          fullWidth
          transitionDuration={{ enter: 200, exit: 150 }}
          open={open}
          onClose={handleClose}
          slots={{
            transition: Zoom,
          }}
        >
          <DialogTitle
            sx={{
              m: 0,
              p: 2,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
            id="customized-dialog-title"
          >
            <HelpOutlinedIcon
              color="primary"
              fontSize="medium"
              sx={{ flexShrink: 0 }}
            />
            <span>{modalState?.title}</span>
          </DialogTitle>

          <DialogActions>
            <Button size="small" onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button size="small" onClick={handleOk} variant="contained">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        {children}
      </ConfirmContext>
    </>
  );
};

export const useConfirmService = () => {
  return useContext(ConfirmContext) as ConfirmContextType;
};

export default ConfirmProvider;
