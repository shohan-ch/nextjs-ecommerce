"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, ControllerRenderProps, Field } from "react-hook-form";
import Typography from "@mui/material/Typography";

type Props = {
  control: any;
  name: string;
  isMultiple?: boolean;
};

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function BaseUpload({
  control,
  name,
  isMultiple = false,
}: Props) {
  const [previews, setPreviews] = React.useState<any>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    field: ControllerRenderProps,
  ) => {
    const files = e.target.files;
    if (files) {
      let uploadFiles = isMultiple ? Array.from(files) : files[0];
      setPreviews(uploadFiles);
      field.onChange(uploadFiles);
    }
  };

  //   console.log("prev", previews);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // console.log("error", fieldState.invalid);
        return (
          <>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload filess
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => handleChange(e, field)}
                multiple={isMultiple}
              />
            </Button>

            {fieldState.invalid && (
              <Typography variant="body2" color="error">
                {" "}
                {fieldState.error?.message}{" "}
              </Typography>
            )}
          </>
        );
      }}
    ></Controller>
  );
}
