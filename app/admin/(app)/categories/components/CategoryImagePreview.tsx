import { environmet } from "@/environments/environment";
import { useModalService } from "@/providers/ModalProvider";
import { Box } from "@mui/material";
import React from "react";

type Props = {
  image: string;
};

const CategoryImagePreview = ({ image }: Props) => {
  const modalService = useModalService();
  return (
    <>
      <img
        onClick={() => {
          modalService.open({
            width: "md",
            component: (
              <>
                <Box sx={{ maxHeight: "600px" }}>
                  {" "}
                  <img
                    style={{
                      objectFit: "contain",
                    }}
                    src={`${environmet.baseUrl}/${image}`}
                    alt="img"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </>
            ),
          });
        }}
        src={`${environmet.baseUrl}/${image}`}
        style={{ objectFit: "contain" }}
        alt="img"
        width={70}
        height={80}
      />
    </>
  );
};

export default CategoryImagePreview;
