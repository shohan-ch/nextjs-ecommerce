"use client";

import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import BaseTable from "@/componentsBase/Table/BaseTable";
import { useModalService } from "@/providers/ModalProvider";
import { usePopConfirmService } from "@/providers/PopConfirmProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import SizeDetails from "./SizeDetails";

type SizeRow = {
  id: number;
  name: string;
  createdAt: string;
  status: number;
};

const rows: SizeRow[] = [
  { id: 1, name: "Small", createdAt: "2024-01-10", status: 1 },
  { id: 2, name: "Medium", createdAt: "2024-01-12", status: 1 },
  { id: 3, name: "Large", createdAt: "2024-01-15", status: 0 },
  { id: 4, name: "Extra Large", createdAt: "2024-01-18", status: 1 },
];

const SizeIndex = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const modal = useModalService();
  const confirm = usePopConfirmService();
  const snackBar = useSnackBar();

  const columns: GridColDef<SizeRow>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
      renderCell: ({ value }) => (
        <Typography
          component="span"
          sx={{ fontWeight: "600", color: "primary.main", fontSize: "14px " }}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row: { status } }) => (
        <Chip
          label={status ? "Active" : "Inactive"}
          sx={{
            bgcolor: status ? "#44cf6c" : "#f9cb40",
            color: "white",
            width: "105px",
            borderRadius: 2,
          }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => handleModal(row)} size="small">
            <EditOutlined color="primary" />
          </IconButton>
          <IconButton
            onClick={(event) => handleDelete(row.id, event.currentTarget)}
            size="small"
          >
            <DeleteOutlineOutlined color="primary" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id: number, element: HTMLElement) => {
    confirm.open({
      title: "Are you sure",
      anchorEl: element,
      handleOk: () => {
        console.log(id);
        snackBar?.open({ type: "success", message: "Succefully deleted!" });
      },
    });
  };

  const handleModal = (row?: SizeRow) => {
    modal?.open({
      title: row ? "Update Size" : "Add Size",
      component: <SizeDetails data={row} />,
      width: "xs",
    });
  };

  const handleSelectChange = (ids: number[]) => {
    setSelectedIds(ids);
  };

  const handleActivate = (isActivate: boolean) => {
    if (isActivate) console.log(selectedIds, "active");
    else console.log(selectedIds, "Inactive");
    setSelectedIds([]);
  };

  return (
    <>
      <Box className="mb-7">
        <Typography variant="h3" className="heading">
          Size
        </Typography>

        <Stack direction="row" className="flex-between mt-6" spacing={2}>
          <TextField
            label="Enter Keywords"
            size="small"
            sx={{ minWidth: "20vw", maxWidth: "52vw" }}
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            sx={{ fontSize: { xs: "12px", sm: "14px" }, whiteSpace: "nowrap" }}
            startIcon={<AddIcon fontSize="small" />}
            variant="contained"
            size="small"
            onClick={() => handleModal()}
          >
            Add New
          </Button>
        </Stack>
      </Box>

      <BaseTable
        data={rows}
        columns={columns}
        onSelectchange={handleSelectChange}
        onActivateChange={handleActivate}
        selectedIds={selectedIds}
        isFooter
      />
    </>
  );
};

export default SizeIndex;
