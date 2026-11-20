"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import BaseUpload from "@/componentsBase/Upload/BaseUpload";
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
import CategoryImagePreview from "./CategoryImagePreview";
import { useConfirmService } from "@/providers/ConfirmProvider";

type Props = {
  data?: ICategory;
};

const CategoryFormSchema = (file: string | null) =>
  z.object({
    name: z.string("Name is required").trim().nonempty(),
    status: z.string("Status is required"),
    image: file ? z.file().optional() : z.file("Image is required").min(1),
  });

type CategoryFormType = z.infer<ReturnType<typeof CategoryFormSchema>>;
type ValidationError = {
  property: keyof CategoryFormType;
  constraints?: Record<string, string>;
};

const CategoryDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const confirmService = useConfirmService();
  const [createApi] = useCreateCategoryMutation();
  const [updateApi] = useUpdateCategoryMutation();
  const modal = useModalService();
  const { control, handleSubmit, setError, setValues } =
    useForm<CategoryFormType>({
      mode: "onChange",
      resolver: zodResolver(CategoryFormSchema(data ? data.image : null)),
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
    confirmService.open({
      title: "Are you sure?",
      onOk: async () => {
        try {
          if (data) {
            await updateApi({ ...formData, id: data.id }).unwrap();
          } else {
            console.log("form data ====", formData);

            await createApi({ ...formData }).unwrap();
          }
          snackbar?.open({
            type: "success",
            message: (data ? "Updated" : "Create") + " Successfully",
          });
          modal.close();
          confirmService.close();
        } catch (error) {
          if (error) {
            const validationErrors = (
              error as { data?: { errors?: ValidationError[] } }
            )?.data?.errors;
            if (validationErrors) {
              validationErrors.forEach(({ property, constraints }) => {
                Object.values(constraints!).forEach((message) =>
                  setError(property, {
                    message,
                  }),
                );
              });
            } else {
              console.log(error);
              snackbar?.open({
                type: "error",
                message: "Failed to save category!",
              });
            }
          }
          confirmService.close();
        }
      },
    });
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
              { name: "Active", value: "1" },
              { name: "Inactive", value: "0" },
            ]}
            checkedItem={"1"}
          />
        </Box>

        <BaseUpload control={control} name="image" label="Image" />

        {data?.image && (
          <>
            <CategoryImagePreview image={data.image} />
          </>
        )}
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
