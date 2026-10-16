import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  TextField,
} from "@mui/material";
import { retry } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { Control, Controller, Field, useForm } from "react-hook-form";
import { text } from "stream/consumers";

type Props = {
  control: any;
  name: string;
  label: string;
  placeHolder?: string;
  type?: "text" | "select" | "checkbox" | "radio";
  inputType?: React.HTMLInputTypeAttribute;
  items?: any[];
  checkedItem?: any;
  helperText?: string;
};

const BaseInputController = (props: Props) => {
  const {
    control,
    name,
    type = "text",
    inputType = "text",
    label,
    placeHolder,
    items = [],
    checkedItem = [],
    helperText,
  } = props;

  return (
    <Box>
      <Controller
        defaultValue={type !== "text" ? checkedItem : ""}
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          // console.log(fieldState, "fieldSate");

          let textShowFirstLoad =
            helperText && !fieldState.isTouched ? helperText : undefined;

          if (type == "text") {
            return (
              <>
                {placeHolder && (
                  <FormLabel
                    htmlFor={field.name}
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "13px",
                      mb: 1.5,
                      display: "block",
                    }}
                  >
                    {" "}
                    {label}
                  </FormLabel>
                )}

                <TextField
                  id={field.name}
                  type={inputType}
                  {...field}
                  label={placeHolder || label}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message || textShowFirstLoad}
                  size="small"
                  fullWidth
                />
              </>
            );
          }

          if (type === "checkbox") {
            if (items.length === 0) {
              return (
                <FormControlLabel
                  label={label}
                  control={
                    <Checkbox
                      checked={Boolean(field.value)}
                      onChange={(event) => field.onChange(event.target.checked)}
                      size="small"
                    />
                  }
                />
              );
            }

            const selectedValues = field.value ?? [];
            return (
              <>
                <FormLabel>{label}</FormLabel>
                <FormGroup>
                  {items.map((item, index) => {
                    let itemValue = item.id ? item.id : item;
                    const label = item.id ? item.name : item;
                    const checked = selectedValues.includes(itemValue);

                    return (
                      <FormControlLabel
                        key={index}
                        label={label}
                        control={
                          <Checkbox
                            checked={checked}
                            onChange={(e) => {
                              console.log(e.target.checked, "check");
                              const newValues = e.target.checked
                                ? [...selectedValues, itemValue]
                                : selectedValues?.filter(
                                    (value: string) => value !== itemValue,
                                  );

                              field.onChange(newValues);
                            }}
                            size="small"
                          />
                        }
                      />
                    );
                  })}
                </FormGroup>

                {fieldState.error?.message && (
                  <FormHelperText error>
                    {fieldState.error.message}
                  </FormHelperText>
                )}
              </>
            );
          }

          if (type === "radio") {
            // console.log(field.value, "radio val");
            return (
              <>
                {label && (
                  <>
                    <FormLabel>{label}</FormLabel>
                  </>
                )}
                <FormGroup>
                  {items.map((item, index) => {
                    const label = item.id ? item.name : item;
                    let disable = item.disable && item.disable;
                    let itemValue = item.id ? item.id : item;
                    let checked = field.value == itemValue;
                    return (
                      <FormControlLabel
                        key={index}
                        label={label}
                        control={
                          <Radio
                            checked={checked}
                            size="small"
                            value={itemValue}
                            disabled={disable}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                            }}
                          />
                        }
                      />
                    );
                  })}

                  {fieldState.error?.message && (
                    <FormHelperText error>
                      {fieldState.error.message}
                    </FormHelperText>
                  )}
                </FormGroup>
              </>
            );
          }

          if (type === "select") {
            // console.log(field.value, "f value");
            return (
              <>
                {placeHolder && (
                  <FormLabel
                    sx={{
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "13px",
                      mb: 1.5,
                      display: "block",
                    }}
                  >
                    {" "}
                    {label}
                  </FormLabel>
                )}

                <TextField
                  select
                  label={placeHolder || label}
                  size="small"
                  error={fieldState.invalid}
                  helperText={fieldState.error ? fieldState.error.message : ""}
                  fullWidth
                  {...field}
                >
                  {items.map((item, index) => {
                    let itemValue = item.id ?? item.value ?? item;
                    let select = field.value == itemValue;
                    const label =
                      item.id !== undefined || item.value !== undefined
                        ? item.name
                        : item;

                    return (
                      <MenuItem key={index} value={itemValue} selected={select}>
                        {" "}
                        {label}{" "}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </>
            );
          } else {
            return <></>;
          }
        }}
      ></Controller>
    </Box>
  );
};

export default React.memo(BaseInputController);
