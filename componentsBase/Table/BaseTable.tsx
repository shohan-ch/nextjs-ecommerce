import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import BaseTableFooter from "./BaseTableFooter";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";

type Props<T extends GridValidRowModel> = {
  data: T[];
  columns: GridColDef<T>[];
  isFooter?: boolean;
  onSelectchange?: (ids: number[]) => void;
  onActivateChange?: (type: boolean) => void;
  isShowSelection?: boolean;
};

const BaseTable = <T extends GridValidRowModel>({
  columns,
  data,
  isFooter,
  onSelectchange,
  onActivateChange,
  isShowSelection = true,
}: Props<T>) => {
  const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const handleSelectChange = (row: GridRowSelectionModel) => {
    const visibleIds = Array.from(
      tableRef.current?.querySelectorAll<HTMLElement>(
        ".MuiDataGrid-row[data-id]",
      ) ?? [],
    )
      .map((element) => Number(element.dataset.id))
      .filter(Number.isFinite);

    const selectIds = visibleIds.filter((id) =>
      row.type === "exclude" ? !row.ids.has(id) : row.ids.has(id),
    );
    setSelectedRowIds(selectIds);
    if (onSelectchange) {
      onSelectchange(selectIds);
    }
  };

  return (
    <>
      <DataGrid
        ref={tableRef}
        onRowSelectionModelChange={handleSelectChange}
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
        checkboxSelection={isShowSelection}
        disableRowSelectionOnClick
        slots={
          isFooter
            ? {
                footer: () => (
                  <BaseTableFooter
                    selectedIds={selectedRowIds}
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
