"use client";
import { userTheme } from "@/app/muiStyles/userTheme";
import { ThemeProvider } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const MuiUserThemeProvider = (props: Props) => {
  const { children } = props;
  return <ThemeProvider theme={userTheme}>{children}</ThemeProvider>;
};
