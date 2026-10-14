import ModalProvider from "@/providers/ModalProvider";
import { MuiThemeProvider } from "@/providers/ThemeProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <MuiThemeProvider theme={"admin"}>
      <ModalProvider>{children}</ModalProvider>
    </MuiThemeProvider>
  );
};

export default layout;
