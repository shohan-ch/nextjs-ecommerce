"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Zoom,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";

type ModalOpenType = {
  title?: string;
  component: React.ReactNode;
  width?: "xs" | "sm" | "md" | "lg" | "xl";
  onOk?: () => void;
  onCancel?: () => void;
};

type ModalContextType = {
  open: (param: ModalOpenType) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

const ModalProvider = ({ children }: Props) => {
  const [modalStack, setModalStack] = useState<ModalOpenType[]>([]);

  // Push a new modal onto the stack
  const handleOpen = (param: ModalOpenType) => {
    setModalStack((prev) => [...prev, param]);
  };

  // Remove only the topmost modal
  const handleClose = () => {
    setModalStack((prev) => prev.slice(0, -1));
  };

  const handleCancel = (modal: ModalOpenType) => {
    modal.onCancel?.();
    handleClose();
  };

  return (
    <ModalContext.Provider
      value={{
        open: handleOpen,
        close: handleClose,
      }}
    >
      {children}

      {modalStack.map((modal, index) => (
        <Dialog
          key={index}
          maxWidth={modal.width || "sm"}
          fullWidth
          transitionDuration={{ enter: 200, exit: 150 }}
          open
          onClose={() => handleCancel(modal)}
          slots={{
            transition: Zoom,
          }}
          slotProps={{
            container: {
              sx: {
                alignItems: "flex-start",
              },
            },
            paper: {
              sx: {
                mt: 10,
              },
            },
          }}
        >
          {modal.title && (
            <>
              <DialogTitle sx={{ m: 0, p: 2, fontWeight: 600 }}>
                {modal.title}
              </DialogTitle>

              <IconButton
                aria-label="close"
                onClick={() => handleCancel(modal)}
                sx={(theme) => ({
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: theme.palette.grey[500],
                })}
              >
                <CloseIcon />
              </IconButton>
            </>
          )}

          <DialogContent dividers sx={!modal.title ? { p: 0 } : {}}>
            {modal.component}
          </DialogContent>
        </Dialog>
      ))}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModalService = () => {
  const context = useContext(ModalContext);
  return context as ModalContextType;
};
