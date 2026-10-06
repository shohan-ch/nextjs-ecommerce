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
  // mobile: z.string().length(11),
  // email: z.email("Not valid email"),
  // address: z.string("Address is required"),
  fruits: z.array(z.number()).min(1, "please select one"),
  gender: z.string("Gender required").nonempty(),
});
type CheckoutFormType = z.infer<typeof CheckoutSchema>;

const CheckOutForm = (props: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormType>({
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
            type="text"
            name="name"
            label="Name 123"
            control={control}
          />

          <Box>
            <BaseInputController
              type="checkbox"
              name="fruits"
              label="Fruits"
              control={control}
              items={[{ id: 1, name: "Orange" }]}
              checkedItem={[1]}
            />
          </Box>

          <Box>
            <BaseInputController
              type="radio"
              name="gender"
              label="Gender"
              control={control}
              items={[
                { id: 1, name: "Male" },
                { id: 2, name: "Female" },
              ]}
              checkedItem={[2]}
            />
          </Box>
        </Stack>

        <br></br>
        <br></br>

        <Button type="submit" variant="contained" color="primary">
          SUbmit
        </Button>
      </form>
    </>
  );
};

export default CheckOutForm;
