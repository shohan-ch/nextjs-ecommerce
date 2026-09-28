import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
  policy: {
    title: string;
    description?: string;
    icon?: React.ReactNode;
  };
};

const SinglePolicy = (props: Props) => {
  const { policy } = props;

  return (
    <Card
      sx={{
        bgcolor: "secondary.light",
        boxShadow: "none",
        borderRadius: 0,
        border: "none",
        p: 0,
        margin: 0,
      }}
    >
      <CardContent
        sx={{
          p: {
            xs: "5px",
            sm: "16px",
          },

          "&:last-child": {
            pb: {
              xs: "5px",
              sm: "16px",
            },
          },
        }}
      >
        <Stack
          direction={{ md: "row", xs: "column" }}
          spacing={{ xs: 1, sm: 1.5 }}
          className="flex-center"
        >
          <Box
            sx={{
              fontSize: { xs: 24, sm: 32, md: 36 },
              display: "flex",
              alignItems: "center",
              flexShrink: 0, // prevent icon from squishing on narrow rows
            }}
          >
            {policy.icon}
          </Box>

          <Box
            sx={{
              minWidth: 0,
              textAlign: {
                xs: "center",
                md: "start",
              },
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontSize: { xs: "0.6rem", sm: "0.7rem", md: "1rem" },
                fontWeight: 600,
                m: 0,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              {policy.title}
            </Typography>

            {policy.description && (
              <Typography
                component="p"
                sx={{
                  fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
                  color: "text.secondary",
                  m: 0,
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {policy.description}
              </Typography>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SinglePolicy;
