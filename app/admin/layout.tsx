import { MuiThemeProvider } from "@/providers/ThemeProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <MuiThemeProvider theme={"admin"}>{children}</MuiThemeProvider>;
};

export default layout;
