import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { MuiUserThemeProvider } from "@/providers/UserThemeProvider";

type Props = {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
};

export default function UserLayout(props: Props) {
  const { children, navbar, footer } = props;

  return (
    <>
      <MuiUserThemeProvider>
        <Navbar />
        <section className="wrapper">{children}</section>
        <Footer />
      </MuiUserThemeProvider>
    </>
  );
}
