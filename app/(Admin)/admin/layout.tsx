import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <html>
      <body>
        <Navbar />
        {props.children}
        <Footer />
      </body>
    </html>
  );
};

export default layout;
