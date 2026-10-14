import { useModalService } from "@/providers/ModalProvider";
import { Button, Divider, Stack } from "@mui/material";
import React, { Ref } from "react";

type Props = {
  data?: any;
};

const CreateColorIndex = ({ data }: Props) => {
  console.log(data, "modalData");
  let modal = useModalService();

  return (
    <>
      <p>
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        nostrum quia suscipit quasi nesciunt beatae minima alias cupiditate
        fugiat natus?
      </p>

      {data ? JSON.stringify(data) : ""}

      <Stack
        className="pt-4"
        direction="row"
        spacing={2}
        sx={{ justifyContent: "end" }}
      >
        <Button variant="outlined" onClick={modal.close}>
          Cancel{" "}
        </Button>
        <Button variant="contained">Add </Button>
      </Stack>
    </>
  );
};

export default CreateColorIndex;
