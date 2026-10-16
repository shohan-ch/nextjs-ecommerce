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

import BaseTable from "@/componentsBase/Table/BaseTable";
import { useModalService } from "@/providers/ModalProvider";
import { DeleteOutlineOutlined, EditOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import CreateColorIndex from "./ColorDetails";
import { usePopConfirmService } from "@/providers/PopConfirmProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useDeleteColorMutation,
  useGetColorsQuery,
} from "@/store/api/admin/colorApi";
import { IColor } from "@/types/type";

type Props = {};

const ColorIndex = (props: Props) => {
  const { data, isFetching, isLoading } = useGetColorsQuery();
  const [listOfData, setListOfData] = useState<IColor[]>();

  const [deleteApiCall] = useDeleteColorMutation();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const modal = useModalService();
  const confirm = usePopConfirmService();
  const snackBar = useSnackBar();
  const columns: GridColDef<IColor>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 70,

      renderCell: ({ value }) => (
        <Typography
          component={"span"}
          sx={{ fontWeight: "600", color: "primary.main", fontSize: "14px " }}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Color Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "colorCode",
      headerName: "Color Code",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      renderCell: ({ row: { status } }) => {
        return (
          <Chip
            label={status ? "Active" : "Inactive"}
            sx={{
              bgcolor: status ? "#44cf6c" : "#f9cb40",
              color: "white",
              width: "105px",
              borderRadius: 2,
            }}
          />
        );
      },
    },

    {
      field: "",
      headerName: "Action",
      sortable: false,
      width: 100,
      renderCell: ({ row }) => {
        const { id } = row;

        return (
          <>
            <IconButton onClick={() => handleModal(row)} size="small">
              <EditOutlined color="primary" />
            </IconButton>
            <IconButton
              onClick={(e) => handleDelete(id, e.currentTarget)}
              size="small"
            >
              <DeleteOutlineOutlined color="primary" />
            </IconButton>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (data) setListOfData(data);
  }, [data]);

  const handleDelete = (id: number, element: any) => {
    confirm.open({
      title: "Are you sure",
      anchorEl: element,
      handleOk: async () => {
        try {
          const deleteRecord = await deleteApiCall(id).unwrap();
          snackBar?.open({ type: "success", message: "Succefully deleted!" });
        } catch (error: any) {
          console.log(error);
          snackBar?.open({ type: "error", message: "Failed to delete!" });
        }
      },
    });
  };

  const handleModal = (row?: any) => {
    const data = row ? row : null;
    const title = row ? "Update Color" : "Add Color";
    modal.open({
      title,
      component: <CreateColorIndex data={data} />,
      width: "xs",
    });
  };

  const handleSelectChange = (selectedIds: number[]) => {
    setSelectedIds(selectedIds);
  };

  const handleActivate = (isActivate: boolean) => {
    if (isActivate) console.log(selectedIds, "active");
    else console.log(selectedIds, "Inactive");
    setSelectedIds([]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    if (!value) {
      setListOfData(data);
      return;
    }
    setListOfData(
      data?.filter(
        (f) =>
          f.name.toLowerCase().includes(value) ||
          f.colorCode.toLowerCase().includes(value),
      ),
    );
  };

  return (
    <>
      <Box className="mb-7">
        <Typography variant="h3" className="heading">
          Color
        </Typography>

        <Stack direction={"row"} className="flex-between mt-6" spacing={2}>
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
            onChange={handleSearch}
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

      {/* Table */}

      <BaseTable
        data={listOfData ?? []}
        columns={columns}
        onSelectchange={handleSelectChange}
        onActivateChange={handleActivate}
        selectedIds={selectedIds}
        isFooter={true}
        isLoading={isFetching}
        // isShowSelection={false}
      />
    </>
  );
};

export default React.memo(ColorIndex);
