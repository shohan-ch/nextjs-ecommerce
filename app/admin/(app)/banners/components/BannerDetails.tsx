"use client";

import BaseInputController from "@/componentsBase/form/BaseInputController";
import BaseUpload from "@/componentsBase/Upload/BaseUpload";
import { useConfirmService } from "@/providers/ConfirmProvider";
import { useModalService } from "@/providers/ModalProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useCreateBannerMutation,
  useUpdateBannerMutation,
  type IBanner,
} from "@/store/api/admin/bannerApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BannerImagePreview from "./BannerImagePreview";

type Props = {
  data?: IBanner;
};

const BannerFormSchema = (file: string | null) =>
  z.object({
    title: z.string("Title is required").trim().nonempty(),
    link: z.string("Link is required").trim().nonempty(),
    status: z.string("Status is required"),
    image: file ? z.file().optional() : z.file("Image is required").min(1),
  });

type BannerFormType = z.infer<ReturnType<typeof BannerFormSchema>>;
type ValidationError = {
  property: keyof BannerFormType;
  constraints?: Record<string, string>;
};

const BannerDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const confirmService = useConfirmService();
  const [createApi] = useCreateBannerMutation();
  const [updateApi] = useUpdateBannerMutation();
  const modal = useModalService();
  const { control, handleSubmit, setError, setValues } =
    useForm<BannerFormType>({
      mode: "onChange",
      resolver: zodResolver(BannerFormSchema(data ? data.image : null)),
    });

  useEffect(() => {
    if (data) {
      setValues({
        title: data.title,
        link: data.link,
        status: data.status,
      });
    }
  }, [data, setValues]);

  const onSubmit = async (formData: BannerFormType) => {
    confirmService.open({
      title: "Are you sure?",
      onOk: async () => {
        try {
          if (data) {
            await updateApi({ ...formData, id: data.id }).unwrap();
          } else {
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
                message: "Failed to save banner!",
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
          placeHolder="Title"
          label="Title"
          control={control}
          name="title"
        />

        <BaseInputController
          placeHolder="Link"
          label="Link"
          control={control}
          name="link"
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

        {data?.image && <BannerImagePreview image={data.image} />}
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

export default React.memo(BannerDetails);
