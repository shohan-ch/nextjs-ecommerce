"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { useModalService } from "@/providers/ModalProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type SizeRow = {
  id: number;
  name: string;
  createdAt: string;
  status: number;
};

type SizeFormType = {
  name: string;
  status: string;
};

type Props = {
  data?: SizeRow;
};

const SizeForm = z.object({
  name: z.string("Name is required").trim().nonempty(),
  status: z.string("Status is required"),
});

const SizeDetails = ({ data }: Props) => {
  const modal = useModalService();
  const { control, handleSubmit, setValues } = useForm<SizeFormType>({
    mode: "onChange",
    resolver: zodResolver(SizeForm),
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        status: data.status ? "Active" : "Inactive",
      });
    }
  }, [data, setValues]);

  const onSubmit = (formData: SizeFormType) => {
    console.log(formData);
  };

  return (
    <>
      <Stack direction="column" spacing={3} className="mt-3">
        <BaseInputController
          placeHolder="Name"
          label="Size Name"
          control={control}
          name="name"
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
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {data ? "Update" : "Add"}
        </Button>
      </Stack>
    </>
  );
};

export default SizeDetails;
