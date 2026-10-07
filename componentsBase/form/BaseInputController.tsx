import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
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
  label?: string;
  type?: "text" | "select" | "checkbox" | "radio";
  items?: any[];
  checkedItem?: any;
  helperText?: string;
};

const BaseInputController = (props: Props) => {
  const {
    control,
    name,
    type = "text",
    label,
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
          //   console.log(field, "field");

          let textShowFirstLoad =
            helperText && !fieldState.isTouched ? helperText : undefined;

          if (type == "text") {
            return (
              <TextField
                {...field}
                label={label}
                error={fieldState.invalid}
                helperText={fieldState.error?.message || textShowFirstLoad}
                size="small"
                fullWidth
              />
            );
          }

          if (type === "checkbox") {
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
            console.log(field.value, "radio val");
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
            console.log(field.value, "f value");
            return (
              <>
                <TextField
                  select
                  label={label}
                  size="small"
                  error={fieldState.invalid}
                  helperText={fieldState.error ? fieldState.error.message : ""}
                  fullWidth
                  {...field}
                >
                  {items.map((item, index) => {
                    let itemValue = item.id ? item.id : item;
                    let select = field.value == itemValue;
                    const label = item.id ? item.name : item;

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

export default BaseInputController;
