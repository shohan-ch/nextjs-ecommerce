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
import { Box, Button, Stack, styled } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BaseUpload from "@/componentsBase/Upload/BaseUpload";
import { environmet } from "@/environments/environment";

type Props = {
  data?: ICategory;
};

const CategoryForm = z.object({
  name: z.string("Name is required").trim().nonempty(),
  status: z.string("Status is required"),
  image: z.file("Image is required").min(1),
});

type CategoryFormType = z.infer<typeof CategoryForm>;
type ValidationError = {
  property: string;
  constraints?: Record<string, string>;
};

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CategoryDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const modalService = useModalService();
  const [createApi] = useCreateCategoryMutation();
  const [updateApi] = useUpdateCategoryMutation();
  const modal = useModalService();
  const { control, handleSubmit, setError, setValues } =
    useForm<CategoryFormType>({
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
        console.log("form data ====", formData);

        await createApi({ ...formData }).unwrap();
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
            if ((property === "name" || property === "status") && message) {
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
              { name: "Active", value: "1" },
              { name: "Inactive", value: "0" },
            ]}
            checkedItem={"1"}
          />
        </Box>

        {data?.image && (
          <>
            <img
              onClick={() => {
                modalService.open({
                  width: "md",
                  component: (
                    <>
                      {" "}
                      <img
                        src={`${environmet.baseUrl}/${data.image}`}
                        alt="img"
                        width="100%"
                        height="100%"
                      />
                    </>
                  ),
                });
              }}
              src={`${environmet.baseUrl}/${data.image}`}
              alt="img"
              width={70}
              height={80}
            />
          </>
        )}

        <BaseUpload control={control} name="image" />
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
