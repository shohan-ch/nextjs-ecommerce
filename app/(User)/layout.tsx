import React from "react";
import { MuiThemeProvider } from "@/providers/ThemeProvider";

type Props = { children: React.ReactNode };

const layoout = ({ children }: Props) => {
  return (
    <>
      <MuiThemeProvider theme="user">{children}</MuiThemeProvider>
    </>
  );
};

export default layoout;
