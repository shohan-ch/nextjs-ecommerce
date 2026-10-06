import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Radio,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Control, Controller, Field, useForm } from "react-hook-form";
import { text } from "stream/consumers";

type Props = {
  control: any;
  name: string;
  label: string;
  type?: "text" | "select" | "checkbox" | "radio";
  items?: any[];
  checkedItem?: any[];
};

const BaseInputController = (props: Props) => {
  const {
    control,
    name,
    type = "text",
    label,
    items = [],
    checkedItem = [],
  } = props;

  return (
    <>
      <Controller
        defaultValue={
          type === "checkbox" || type === "radio" ? checkedItem : ""
        }
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          //   console.log(field, "field");
          if (type == "text") {
            return (
              <TextField
                {...field}
                label={label}
                error={fieldState.invalid}
                helperText={fieldState.error?.message}
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
            return (
              <>
                <FormLabel>{label}</FormLabel>
                <FormGroup>
                  {items.map((item, index) => {
                    let itemValue = item.id ? item.id : item;
                    let checked = field.value == itemValue;
                    return (
                      <FormControlLabel
                        key={index}
                        label={item.name}
                        control={
                          <Radio
                            checked={checked}
                            size="small"
                            value={itemValue}
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
          } else {
            return <></>;
          }
        }}
      ></Controller>
    </>
  );
};

export default BaseInputController;
