import { Box, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
};

const SectionTitle = ({ title = "" }: Props) => {
  return (
    <>
      <Stack
        className="pb-10"
        direction={"row"}
        spacing={3}
        sx={{ alignItems: "center" }}
      >
        <Box sx={{ borderTop: "1px solid black", flexGrow: 1 }}></Box>
        <Typography
          variant="h5"
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "2px",
            "@media (min-width: 600px)": {
              fontSize: "18px",
            },
          }}
        >
          {title}{" "}
        </Typography>
        <Box sx={{ borderTop: "1px solid black", flexGrow: 1 }}></Box>
      </Stack>
    </>
  );
};

export default SectionTitle;
