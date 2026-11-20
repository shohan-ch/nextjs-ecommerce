import BaseInputController from "@/componentsBase/form/BaseInputController";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useImperativeHandle } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

const CheckoutSchema = z.object({
  name: z.string("Name is required").trim().nonempty(),
  mobile: z
    .string()
    .nonempty("Mobile is required")
    .regex(/^01\d{9}$/, "Enter a valid 11-digit mobile number"),
  email: z.optional(z.email("Not valid email")),
  address: z.string("Address is required").trim().nonempty(),
  city: z.string("City is  required").trim().nonempty(),
  paymentType: z.number(),
});
type CheckoutFormType = z.infer<typeof CheckoutSchema>;

type Props = {
  ref: any;
};
const CheckOutForm = ({ ref }: Props) => {
  const { control, handleSubmit } = useForm<CheckoutFormType>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit: SubmitHandler<CheckoutFormType> = (formData) => {
    // console.log(formData, "data");
    // setFormData(formData);
  };

  useImperativeHandle(ref, () => ({
    submitForm: () =>
      new Promise<CheckoutFormType | null>((resolve) => {
        handleSubmit(
          (data) => resolve(data),
          () => resolve(null),
        )();
      }),
  }));

  return (
    <>
      <form>
        <Typography variant="h6" className="heading pb-3">
          Contact
        </Typography>
        <Grid container spacing={1}>
          <Grid size={12}>
            <BaseInputController
              name="mobile"
              label="Mobile"
              control={control}
              helperText="Mobile is required"
            />
          </Grid>

          <Typography variant="h6" className="heading  pt-3">
            Payment Method
          </Typography>

          <Grid size={12}>
            <BaseInputController
              type="radio"
              name="paymentType"
              control={control}
              items={[
                {
                  id: 1,
                  name: "Cash On Delivery",
                  disable: false,
                },
                {
                  id: 2,
                  name: "Online Payment",
                  disable: true,
                },
              ]}
              checkedItem={1}
            />
          </Grid>
        </Grid>

        <Typography variant="h6" className="heading pb-3 pt-3">
          Delivery Information
        </Typography>
        <Grid container spacing={2}>
          <Grid size={12}>
            <BaseInputController
              name="name"
              label="Name"
              control={control}
              helperText="Name is required"
            />
          </Grid>
          <Grid size={6}>
            <BaseInputController
              name="address"
              label="Address"
              control={control}
              helperText="Address is required"
            />
          </Grid>
          <Grid size={6}>
            <BaseInputController name="city" label="City" control={control} />
          </Grid>
          <Grid size={12}>
            <BaseInputController name="email" label="Email" control={control} />
          </Grid>
        </Grid>

        {/* <Button variant="contained" color="primary" onClick={handleClick}>
          SUbmit
        </Button> */}
      </form>
    </>
  );
};

export default CheckOutForm;
