"use client";
import Typography from "@mui/material/Typography";
import { Controller } from "react-hook-form";
import UploadByButton from "./UploadByButton";
import UploadByDrop from "./UploadByDrop";

type Props = {
  control: any;
  name: string;
  isMultiple?: boolean;
  label?: string;
  type?: "button" | "drop";
};

export default function BaseUpload({
  control,
  name,
  isMultiple = false,
  label,
  type = "button",
}: Props) {
  //   console.log("prev", previews);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        // console.log("error", fieldState.invalid);
        return (
          <>
            {type === "drop" && (
              <UploadByDrop
                field={field}
                isMultiple={isMultiple}
                label={label}
              ></UploadByDrop>
            )}

            {type === "button" && (
              <>
                <UploadByButton
                  field={field}
                  label={label ?? ""}
                  isMultiple={isMultiple}
                />
              </>
            )}

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
