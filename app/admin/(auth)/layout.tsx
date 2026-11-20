import React from "react";

import "./auth.scss";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default layout;
