"use client";
import { adminTheme } from "@/app/styles/theme/adminTheme";
import { userTheme } from "@/app/styles/theme/userTheme";

import { ThemeProvider } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
  theme: "user" | "admin";
};
export const MuiThemeProvider = ({ children, theme }: Props) => {
  const selectTheme = theme == "user" ? userTheme : adminTheme;

  return <ThemeProvider theme={selectTheme}>{children}</ThemeProvider>;
};
