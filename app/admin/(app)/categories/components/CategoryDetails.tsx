"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import { useModalService } from "@/providers/ModalProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  type ICategory,
} from "@/store/api/admin/categoryApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  data?: ICategory;
};

const CategoryForm = z.object({
  name: z.string("Name is required").trim().nonempty(),
  status: z.number("Status is required"),
});

type CategoryFormType = z.infer<typeof CategoryForm>;
type ValidationError = {
  property: string;
  constraints?: Record<string, string>;
};

const CategoryDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const [createApi] = useCreateCategoryMutation();
  const [updateApi] = useUpdateCategoryMutation();
  const modal = useModalService();
  const { control, handleSubmit, setError, setValues } = useForm<CategoryFormType>({
    mode: "onChange",
    resolver: zodResolver(CategoryForm),
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        status: data.status,
      });
    }
  }, [data, setValues]);

  const onSubmit = async (formData: CategoryFormType) => {
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
      if (error) {
        const validationErrors = (
          error as { data?: { errors?: ValidationError[] } }
        )?.data?.errors;

        if (validationErrors) {
          validationErrors.forEach(({ property, constraints }) => {
            const message = constraints && Object.values(constraints)[0];
            if (
              (property === "name" || property === "status") &&
              message
            ) {
              setError(property, { message });
            }
          });
        } else {
          console.log(error);
          snackbar?.open({
            type: "error",
            message: "Failed to save category!",
          });
        }
      }
    }
  };

  return (
    <>
      <Stack direction="column" spacing={3} className="mt-3">
        <BaseInputController
          placeHolder="Name"
          label="Category Name"
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

export default React.memo(CategoryDetails);
