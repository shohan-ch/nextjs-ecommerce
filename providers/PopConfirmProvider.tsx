"use client";

import { Box, Button, Container, Popover, Stack } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
type IConfirmContextState = {
  title: string;
  anchorEl: HTMLElement | null;
  handleOk: () => void;
};

type IConfirmContext = {
  open: (props: IConfirmContextState) => void;
};

const ConfrimContext = createContext<IConfirmContext | null>(null);

type Props = {
  children: React.ReactNode;
};

const PopConfirmProvider = (props: Props) => {
  const { children } = props;
  const [popState, setPopstate] = useState<any>({
    open: false,
    title: "",
    anchorEl: null,
  });

  const [handler, setHandeler] = useState<any>(null);

  const handleConfirm = (args: IConfirmContextState) => {
    setPopstate({
      ...popState,
      anchorEl: args.anchorEl,
      title: args.title,
      open: true,
    });
    setHandeler(() => args.handleOk);
  };

  const handleClose = () => {
    setPopstate({ ...popState, open: false });

    console.log("close pop");
  };

  const handleOk = async () => {
    if (handler) {
      await handler();
      setPopstate((state: any) => ({ ...state, open: false }));
    }
  };
  return (
    <>
      <ConfrimContext value={{ open: handleConfirm }}>
        {children}
        <Popover
          open={popState.open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          onClose={handleClose}
          transitionDuration={"auto"}
          anchorEl={popState.anchorEl}
          slotProps={{
            paper: {
              sx: {
                p: 1,
                borderRadius: 2,
              },
            },
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", marginBottom: 1 }}
          >
            {" "}
            <HelpOutlinedIcon color="warning" />
            <p>{popState.title}</p>
          </Stack>

          <Stack spacing={1} direction="row" sx={{ justifyContent: "end" }}>
            <Button
              onClick={handleClose}
              variant="contained"
              size="small"
              color="error"
            >
              Close
            </Button>

            <Button onClick={handleOk} variant="contained" size="small">
              Ok
            </Button>
          </Stack>
        </Popover>
      </ConfrimContext>
    </>
  );
};

export default PopConfirmProvider;

export const usePopConfirmService = () => {
  const context = useContext(ConfrimContext);
  return context as IConfirmContext;
};
