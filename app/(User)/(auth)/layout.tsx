import React from "react";

import "./auth.scss";

type Props = {
  children: React.ReactNode;
};

export default (props: Props) => {
  const { children } = props;

  return (
    <>
      <>{children}</>
    </>
  );
};
