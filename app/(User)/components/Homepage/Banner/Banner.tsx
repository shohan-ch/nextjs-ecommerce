import React from "react";
import styles from "./Banner.module.scss";

type Props = {
  image: string;
};

const Banner = (props: Props) => {
  const { image } = props;
  return (
    <div className={styles.banner}>
      <img className={styles.image} src={image} alt="Banner" />
    </div>
  );
};

export default Banner;
