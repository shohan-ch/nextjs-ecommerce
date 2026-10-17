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
import { usePopConfirmService } from "@/providers/PopConfirmProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useDeleteColorMutation,
  useGetColorsQuery,
  useToggelStatusMutation,
} from "@/store/api/admin/colorApi";
import { IColor } from "@/types/type";
import { DeleteOutlineOutlined, EditOutlined, Try } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useDeferredValue, useMemo, useState } from "react";
import CreateColorIndex from "./ColorDetails";
import { useConfirmService } from "@/providers/ConfirmProvider";

type Props = {};

const ColorIndex = (props: Props) => {
  const { data, isFetching, isLoading } = useGetColorsQuery();
  const [toggleStatusApi] = useToggelStatusMutation();
  const [deleteApiCall] = useDeleteColorMutation();
  const [searchText, setSearchText] = useState("");
  const deferredSearch = useDeferredValue(searchText);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const modal = useModalService();
  const confirmService = useConfirmService();
  const popConfirm = usePopConfirmService();
  const snackBar = useSnackBar();
  const columns = useMemo<GridColDef<IColor>[]>(
    () => [
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
    ],
    [],
  );

  const listOfData = useMemo(() => {
    const search = deferredSearch.toLowerCase();

    if (!search) {
      return data ?? [];
    }
    return (data ?? []).filter(
      (item) =>
        item.name.toLowerCase().includes(search) ||
        item.colorCode.toLowerCase().includes(search),
    );
  }, [data, deferredSearch]);

  const handleDelete = (id: number, element: any) => {
    popConfirm.open({
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
    setSearchText("");
  };

  const handleSelectChange = useCallback(
    (ids: number[], isUnselectAll?: boolean) => {
      if (isUnselectAll) {
        setSelectedIds([]);
        return;
      }
      setSelectedIds(ids);
    },
    [],
  );

  const handleActivate = useCallback(
    (isActivate: boolean) => {
      if (selectedIds.length > 0)
        confirmService.open({
          title: "Are you sure?",
          onOk: async () => {
            try {
              let result = await toggleStatusApi({
                ids: selectedIds,
                status: isActivate ? 1 : 0,
              }).unwrap();
              setSelectedIds([]);
              confirmService.close();
              snackBar?.open({
                type: "success",
                message: "Successfully update",
              });
            } catch (e) {
              console.log(e);
            }
          },
        });
    },
    [selectedIds],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
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
            value={searchText}
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
        data={listOfData}
        columns={columns}
        onSelectchange={handleSelectChange}
        onActivateChange={handleActivate}
        selectedIds={selectedIds}
        isFooter={true}
        isLoading={isFetching}
        isShowSelection={true}
      />
    </>
  );
};

export default React.memo(ColorIndex);
