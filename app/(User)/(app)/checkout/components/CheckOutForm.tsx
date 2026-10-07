import BaseInputController from "@/componentsBase/form/BaseInputController";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckBox } from "@mui/icons-material";
import {
  TextField,
  Button,
  Input,
  OutlinedInput,
  InputLabel,
  FormControl,
  Box,
  Stack,
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z, { email } from "zod";

type Props = {};

const CheckoutSchema = z.object({
  name: z.string("Name is required").trim().nonempty(),
  mobile: z
    .string()
    .nonempty("Mobile is required")
    .regex(/^01\d{9}$/, "Enter a valid 11-digit mobile number"),
  email: z.optional(z.email("Not valid email")),
  address: z.string("Address is required").nonempty(),
  city: z.string("City is  required").nonempty(),
});
type CheckoutFormType = z.infer<typeof CheckoutSchema>;

const CheckOutForm = (props: Props) => {
  const { control, handleSubmit } = useForm<CheckoutFormType>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutFormType> = (formData) => {
    console.log(formData, "data");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} spacing={3}>
          <BaseInputController
            name="mobile"
            label="Mobile"
            control={control}
            helperText="Mobile is required"
          />
          <BaseInputController name="name" label="Name" control={control} />
          <BaseInputController
            name="address"
            label="Address"
            control={control}
          />
          <BaseInputController name="city" label="City" control={control} />
          <BaseInputController name="email" label="Email" control={control} />
        </Stack>

        <Button type="submit" variant="contained" color="primary">
          SUbmit
        </Button>
      </form>
    </>
  );
};

export default CheckOutForm;
