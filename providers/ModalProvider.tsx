"use client";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";

type ModalOpenType = {
  title: string;
  component: React.ReactNode;
  onOk?: () => void | null;
  onCancel?: () => void | null;
};

type ModalContextType = {
  open: (param: ModalOpenType) => void;
  close?: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState<ModalOpenType>();

  const handleOpen = (param: ModalOpenType) => {
    console.log(param, "param got");
    setOpen(true);
    setModalState({
      title: param.title,
      component: param.component,
      onOk: param.onOk ? param.onOk : undefined,
      onCancel: param.onCancel ? param.onCancel : undefined,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = (callback: Function) => {
    if (modalState?.onOk) {
      modalState.onOk();
    }
  };

  const onCancel = () => {
    if (modalState?.onCancel) {
      modalState.onCancel();
    }
    setOpen(false);
  };

  return (
    <>
      <ModalContext
        value={{
          open: handleOpen,
          close: handleClose,
        }}
      >
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {modalState?.title}{" "}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>{modalState?.component}</DialogContent>
          {/* <DialogActions>
            <Button size="small" onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            <Button size="small" onClick={() => handleOk} variant="contained">
              Add
            </Button>
          </DialogActions> */}
        </Dialog>
        {children}
      </ModalContext>
    </>
  );
};

export default ModalProvider;

export const useModalService = () => {
  return useContext(ModalContext) as ModalContextType;
};
