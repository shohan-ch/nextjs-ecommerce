import { environmet } from "@/environments/environment";
import { useModalService } from "@/providers/ModalProvider";
import { Box } from "@mui/material";
import React from "react";

type Props = {
  image: string;
  width?: number;
  height?: number;
};

const CategoryImagePreview = ({ image, width = 70, height = 70 }: Props) => {
  const modalService = useModalService();
  return (
    <>
      <img
        onClick={() => {
          modalService.open({
            width: "md",
            component: (
              <>
                <Box sx={styles.imageContainer}>
                  <img
                    style={{
                      display: "block",
                      maxWidth: "100%",
                      maxHeight: "70vh",
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }}
                    src={`${environmet.baseUrl}/${image}`}
                    alt="img"
                  />
                </Box>
              </>
            ),
          });
        }}
        src={`${environmet.baseUrl}/${image}`}
        style={{
          objectFit: "cover",
          cursor: "pointer",
          paddingTop: "2px",
          paddingBottom: "2px",
        }}
        alt="img"
        width={width}
        height={height}
      />
    </>
  );
};

export default CategoryImagePreview;

const styles = {
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxHeight: { xs: "70vh", sm: "600px" },
    overflow: "hidden",
  },
};
