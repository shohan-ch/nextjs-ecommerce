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
import {
  Box,
  Button,
  FormLabel,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProductImagePreview from "./ProductImagePreview";

type Props = {
  data?: IProduct;
};

const ProductFormSchema = (image?: string) =>
  z.object({
    name: z.string("Name is required").trim().nonempty(),
    description: z.string("Description is required").trim().nonempty(),
    // image: image ? z.file().optional() : z.file("Image is required").min(1),
  });

type ProductFormType = z.infer<ReturnType<typeof ProductFormSchema>>;
type ValidationError = {
  property: keyof ProductFormType;
  constraints?: Record<string, string>;
};

const ProductDetails = ({ data }: Props) => {
  const [variaytionId, setVariationId] = useState<number | null>(null);
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

  const variations = [
    { id: 1, name: "Size" },
    { id: 2, name: "Color" },
    { id: 3, name: "Size & Color" },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "75vh",
          overflow: "hidden",
        }}
      >
        {/* Scrollable content */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            p: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid size={9}>
              <BaseInputController
                placeHolder="Name"
                label="Name"
                control={control}
                name="name"
              />
            </Grid>

            <Grid size={3}>
              <label htmlFor="variationId" style={styles.label}>
                Variation
              </label>
              <TextField
                id="variationId"
                select
                placeholder="Select Variant"
                label="Select variation"
                fullWidth
                size="small"
                value={variaytionId ?? ""}
                onChange={(e) => setVariationId(Number(e.target.value))}
              >
                {variations.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={12}>
              <BaseInputController
                placeHolder="Product Description..."
                label="Description"
                control={control}
                name="description"
                type="textArea"
                textAreaRows={6}
              />
            </Grid>

            <Grid size={6}>
              <BaseUpload
                control={control}
                name="image"
                label="Images"
                isMultiple
              />
            </Grid>
            <Grid size={6}>
              <BaseUpload
                control={control}
                name="image"
                type="drop"
                label="Videos"
              />
            </Grid>

            <Grid size={2}>
              <BaseInputController
                placeHolder="Price"
                label="Price"
                control={control}
                name="name"
                inputType="text"
              />
            </Grid>
            <Grid size={2}>
              <BaseInputController
                placeHolder="Quantity"
                label="Quantity"
                control={control}
                name="name"
                inputType="text"
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
        </Box>

        {/* Fixed footer */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 2,
            flexShrink: 0,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="outlined" onClick={modal.close}>
            Cancel
          </Button>

          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {data ? "Update" : "Add"}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default React.memo(ProductDetails);

type Styles = {
  label: React.CSSProperties;
};

const styles: Styles = {
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "12px",
    display: "block",
  },
};
