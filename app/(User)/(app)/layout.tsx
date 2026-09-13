import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
};

export default function UserLayout(props: Props) {
  const { children, navbar, footer } = props;

  return (
    <>
      {/* {navbar} */}
      <Navbar />
      <section>{children}</section>
      <Footer />
      {/* {footer} */}
    </>
  );
}
