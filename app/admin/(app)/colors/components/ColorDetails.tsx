import BaseInputController from "@/componentsBase/form/BaseInputController";
import { useModalService } from "@/providers/ModalProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Divider, Stack } from "@mui/material";
import React, { Ref, useEffect } from "react";
import { useForm } from "react-hook-form";
import { infer, z } from "zod";

type Props = {
  data?: any;
};

const ColorForm = z.object({
  name: z.string("Name is required").trim().nonempty(),
  colorCode: z.string("Color code is required").trim().nonempty(),
  status: z.string("Status is required"),
});

type ColorFormType = z.infer<typeof ColorForm>;

const CreateColorIndex = ({ data }: Props) => {
  console.log(data, "dts");
  let modal = useModalService();
  const { control, handleSubmit, setValue, setValues } = useForm({
    mode: "onChange",
    resolver: zodResolver(ColorForm),
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        colorCode: data.colorCode,
        status: data.status ? "Active" : "Inactive",
      });
    }
  }, []);
  const onSubmit = (formData: ColorFormType) => {
    console.log(formData);
  };

  return (
    <>
      <Stack direction={"column"} spacing={3} className="mt-3">
        <BaseInputController
          placeHolder="Name"
          label="Color Name"
          control={control}
          name="name"
        />
        <BaseInputController
          placeHolder="Code"
          label="Color Code"
          control={control}
          name="colorCode"
        />

        <Box sx={{ width: "40%" }}>
          <BaseInputController
            placeHolder="Status"
            label="Status"
            control={control}
            name="status"
            type="select"
            items={["Active", "Inactive"]}
          />
        </Box>
      </Stack>

      <Stack
        className="pt-12"
        direction="row"
        spacing={2}
        sx={{ justifyContent: "end" }}
      >
        <Button variant="outlined" onClick={modal.close}>
          Cancel{" "}
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {data ? "Update" : "Add"}
        </Button>
      </Stack>
    </>
  );
};

export default CreateColorIndex;
