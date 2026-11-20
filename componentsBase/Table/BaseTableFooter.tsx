import { Box, Button, Stack } from "@mui/material";
import {
  GridFooterContainer,
  GridPagination,
  GridSelectedRowCount,
} from "@mui/x-data-grid";
import React from "react";

type Props = {
  selectedIds?: number[];
  onActiveChange?: (type: boolean) => void;
};

const BaseTableFooter = ({ selectedIds = [], onActiveChange }: Props) => {
  const handleButton = (type: boolean) => {
    if (onActiveChange) {
      onActiveChange(type);
    }
  };
  return (
    <>
      <GridFooterContainer
        sx={{
          py: 2,
          pl: 1,
        }}
      >
        <Stack direction={"row"} spacing={2}>
          <Button
            size="small"
            variant="contained"
            sx={{ fontWeight: 600 }}
            onClick={() => handleButton(true)}
          >
            Activate
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handleButton(false)}
          >
            Deactivate
          </Button>
        </Stack>

        {selectedIds.length > 0 && (
          <GridSelectedRowCount selectedRowCount={selectedIds?.length} />
        )}

        <GridPagination />
      </GridFooterContainer>
    </>
  );
};

export default BaseTableFooter;
