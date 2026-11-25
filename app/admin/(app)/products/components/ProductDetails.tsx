"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import BaseUpload from "@/componentsBase/Upload/BaseUpload";
import { useConfirmService } from "@/providers/ConfirmProvider";
import { useModalService } from "@/providers/ModalProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  type IProduct,
} from "@/store/api/admin/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductImagePreview from "./ProductImagePreview";

type Props = {
  data?: IProduct;
};

const ProductFormSchema = (image?: string) =>
  z.object({
    name: z.string("Name is required").trim().nonempty(),
    variantTypeId: z.number().optional(),
    description: z.string("Description is required").trim().nonempty(),
    // image: image ? z.file().optional() : z.file("Image is required").min(1),
  });

type ProductFormType = z.infer<ReturnType<typeof ProductFormSchema>>;
type ValidationError = {
  property: keyof ProductFormType;
  constraints?: Record<string, string>;
};

const ProductDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const confirmService = useConfirmService();
  const [createApi] = useCreateProductMutation();
  const [updateApi] = useUpdateProductMutation();
  const modal = useModalService();
  const { control, handleSubmit, setError, setValues } =
    useForm<ProductFormType>({
      mode: "onChange",
      resolver: zodResolver(ProductFormSchema(data?.image)),
    });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        description: data.description,
      });
    }
  }, [data, setValues]);

  const onSubmit = async (formData: ProductFormType) => {
    confirmService.open({
      title: "Are you sure?",
      onOk: async () => {
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
          confirmService.close();
        } catch (error) {
          if (error) {
            const validationErrors = (
              error as { data?: { errors?: ValidationError[] } }
            )?.data?.errors;
            if (validationErrors) {
              validationErrors.forEach(({ property, constraints }) => {
                Object.values(constraints!).forEach((message) =>
                  setError(property, { message }),
                );
              });
            } else {
              console.log(error);
              snackbar?.open({
                type: "error",
                message: "Failed to save product!",
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
      <Grid container spacing={2}>
        <Grid size={12}>
          <BaseInputController
            placeHolder="Name"
            label="Name"
            control={control}
            name="name"
          />
        </Grid>
        <Grid size={9}>
          <BaseInputController
            placeHolder="Product Description..."
            label="Description"
            control={control}
            name="description"
            type="textArea"
            textAreaRows={6}
          />
        </Grid>
        <Grid size={3}>
          <BaseInputController
            placeHolder="Select Variant"
            label="Variation"
            control={control}
            name="variantTypeId"
            type="select"
            items={[
              { id: 1, name: "Size" },
              { id: 2, name: "Color" },
              { id: 3, name: "Size & Color" },
            ]}
          />
        </Grid>
      </Grid>

      {/* <Stack direction="column" spacing={3} className="mt-3">
        <BaseInputController
          placeHolder="Name"
          label="Name"
          control={control}
          name="name"
        />

        <BaseInputController
          placeHolder="Description"
          label="Description"
          control={control}
          name="description"
        />

        <BaseUpload control={control} name="image" label="Image" />

        {data?.image && <ProductImagePreview image={data.image} />}
      </Stack> */}

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

export default React.memo(ProductDetails);
