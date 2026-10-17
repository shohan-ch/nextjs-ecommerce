"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { useModalService } from "@/providers/ModalProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useCreateSizeMutation,
  useUpdateSizeMutation,
} from "@/store/api/admin/sizeApi";
import { ISize } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  data?: ISize;
};

const SizeForm = z.object({
  name: z.string("Name is required").trim().nonempty(),
  status: z.number("Status is required"),
});

type SizeFormType = z.infer<typeof SizeForm>;

const SizeDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const [createApi] = useCreateSizeMutation();
  const [updateApi] = useUpdateSizeMutation();
  const modal = useModalService();
  const { control, handleSubmit, setError, setValues } = useForm<SizeFormType>({
    mode: "onChange",
    resolver: zodResolver(SizeForm),
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        status: data.status,
      });
    }
  }, [data, setValues]);

  const onSubmit = async (formData: SizeFormType) => {
    try {
      if (data) {
        await updateApi({ ...formData, id: data.id }).unwrap();
      } else {
        await createApi(formData).unwrap();
      }
      snackbar?.open({
        type: "success",
        message: (data ? "Updated" : "Create") + " Successfully",
      });
      modal.close();
    } catch (error) {
      const validationErrors = (
        error as {
          data?: {
            errors?: {
              property?: string;
              constraints?: Record<string, string>;
            }[];
          };
        }
      )?.data?.errors;

      if (validationErrors?.length) {
        validationErrors.forEach(({ property, constraints }) => {
          const message = constraints && Object.values(constraints)[0];
          if ((property === "name" || property === "status") && message) {
            setError(property, { message });
          }
        });
      } else {
        snackbar?.open({
          type: "error",
          message: "Failed to save size!",
        });
      }
    }
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
            items={[
              { name: "Active", value: 1 },
              { name: "Inactive", value: 0 },
            ]}
            checkedItem={1}
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
