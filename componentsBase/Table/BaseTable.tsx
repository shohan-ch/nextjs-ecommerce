import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import React from "react";
import BaseTableFooter from "./BaseTableFooter";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

type Props<T extends GridValidRowModel> = {
  data: T[];
  columns: GridColDef<T>[];
  isFooter?: boolean;
  onSelectchange?: (id: GridRowSelectionModel) => void;
  selectedIds?: number[];
  onActivateChange?: (type: boolean) => void;
};

const BaseTable = <T extends GridValidRowModel>({
  columns,
  data,
  isFooter,
  onSelectchange,
  selectedIds,
  onActivateChange,
}: Props<T>) => {
  // footer: isFooter ? BaseTableFooter : () => <></>,

  const id = 1;
  return (
    <>
      <DataGrid
        onRowSelectionModelChange={(e) => {
          if (onSelectchange) onSelectchange(e);
        }}
        rows={data}
        columns={columns}
        showCellVerticalBorder={false}
        autoHeight
        rowHeight={48}
        columnHeaderHeight={48}
        disableColumnMenu
        disableColumnResize
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10, 25, 100]}
        checkboxSelection
        disableRowSelectionOnClick
        slots={
          isFooter
            ? {
                footer: () => (
                  <BaseTableFooter
                    selectedIds={selectedIds}
                    onActiveChange={onActivateChange}
                  />
                ),
              }
            : {}
        }
        sx={styles}
      />
    </>
  );
};

export default BaseTable;

const styles = {
  border: "none",
  "& .MuiDataGrid-cell": {
    border: "none",
  },

  "& .MuiDataGrid-columnHeader": {
    background: "#fafafa",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 400,
  },
  "& .MuiDataGrid-row:nth-of-type(odd)": {
    backgroundColor: "#f0eeee",
  },
  "& .MuiDataGrid-row:nth-of-type(even)": {
    backgroundColor: "#fafafa",
  },
  "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
    {
      outline: "none",
    },
  "& .MuiDataGrid-cell:focus": {
    outline: "none",
  },

  "& .MuiDataGrid-cell:focus-within": {
    outline: "none",
  },
} satisfies SxProps<Theme>;
