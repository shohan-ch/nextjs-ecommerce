import { MuiUserThemeProvider } from "@/providers/UserThemeProvider";
import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import DeliveryTerms from "../components/Homepage/DeliveryTerms/DeliveryTerms";

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
        <DeliveryTerms />
        <Footer />
      </MuiUserThemeProvider>
    </>
  );
}
