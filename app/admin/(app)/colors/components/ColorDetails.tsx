import BaseInputController from "@/componentsBase/form/BaseInputController";
import { useModalService } from "@/providers/ModalProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useCreateColorMutation,
  useUpdateColorMutation,
} from "@/store/api/admin/colorApi";
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
  status: z.number("Status is required"),
});

type ColorFormType = z.infer<typeof ColorForm>;

const ColorDetails = ({ data }: Props) => {
  const snackbar = useSnackBar();
  const [createApi, result] = useCreateColorMutation();
  const [updateApi, updateResult] = useUpdateColorMutation();
  let modal = useModalService();
  const { control, handleSubmit, setError, setValues } = useForm({
    mode: "onChange",
    resolver: zodResolver(ColorForm),
  });

  useEffect(() => {
    if (data) {
      setValues({
        name: data.name,
        colorCode: data.colorCode,
        status: data.status,
      });
    }
  }, []);
  const onSubmit = async (formData: ColorFormType) => {
    // console.log(formData);
    try {
      if (data) {
        let update = await updateApi({ ...formData, id: data.id }).unwrap();
      } else {
        let create = await createApi(formData).unwrap();
      }
      snackbar?.open({
        type: "success",
        message: (data ? "Updated" : "Create") + " Successfully",
      });
      modal.close();
    } catch (error: any) {
      if (error) {
        console.log(error, "er");
        error?.data?.errors.forEach((e: any) => {
          let errMsg: any = Object.values(e?.constraints)[0];
          setError(e.property, {
            message: errMsg,
          });
        });
      }
    }
  };

  console.log("color child");

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
          Cancel{" "}
        </Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained">
          {data ? "Update" : "Add"}
        </Button>
      </Stack>
    </>
  );
};

export default React.memo(ColorDetails);
