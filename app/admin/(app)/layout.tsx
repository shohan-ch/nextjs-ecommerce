import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <section className="wrapper">{children}</section>
      <Footer />
    </>
  );
};

export default layout;
