import React from "react";
import DeliveryTerms from "../components/Homepage/DeliveryTerms/DeliveryTerms";
import Footer from "./footer";
import Navbar from "./navbar";

type Props = {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
};

export default function UserLayout(props: Props) {
  const { children, navbar, footer } = props;

  return (
    <>
      <Navbar />
      <section className="wrapper">{children}</section>
      <DeliveryTerms />
      <Footer />
    </>
  );
}
