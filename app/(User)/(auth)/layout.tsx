import { MuiUserThemeProvider } from "@/providers/UserThemeProvider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default (props: Props) => {
  const { children } = props;

  return (
    <>
      <MuiUserThemeProvider>{children}</MuiUserThemeProvider>
    </>
  );
};
