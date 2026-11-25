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
import { format } from "date-fns";
import React, { useCallback, useDeferredValue, useMemo, useState } from "react";
import BaseTable from "@/componentsBase/Table/BaseTable";
import { useConfirmService } from "@/providers/ConfirmProvider";
import { useModalService } from "@/providers/ModalProvider";
import { usePopConfirmService } from "@/providers/PopConfirmProvider";
import { useSnackBar } from "@/providers/SnackbarProvider";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useToggleProductStatusMutation,
  type IProduct,
} from "@/store/api/admin/productApi";
import ProductDetails from "./ProductDetails";
import ProductImagePreview from "./ProductImagePreview";

const ProductIndex = () => {
  const { data, isFetching } = useGetProductsQuery();
  const [toggleStatusApi] = useToggleProductStatusMutation();
  const [deleteApiCall] = useDeleteProductMutation();
  const [searchText, setSearchText] = useState("");
  const deferredSearch = useDeferredValue(searchText);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const modal = useModalService();
  const confirmService = useConfirmService();
  const popConfirm = usePopConfirmService();
  const snackBar = useSnackBar();

  const handleDelete = useCallback(
    (id: number, element: HTMLElement) => {
      popConfirm.open({
        title: "Are you sure",
        anchorEl: element,
        handleOk: async () => {
          try {
            await deleteApiCall(id).unwrap();
            snackBar?.open({ type: "success", message: "Succefully deleted!" });
          } catch (error) {
            console.log(error);
            snackBar?.open({ type: "error", message: "Failed to delete!" });
          }
        },
      });
    },
    [deleteApiCall, popConfirm, snackBar],
  );

  const handleModal = useCallback(
    (row?: IProduct) => {
      modal.open({
        title: row ? "Update Product" : "Add Product",
        component: <ProductDetails data={row} />,
        width: "lg",
      });
      setSearchText("");
    },
    [modal],
  );

  const columns = useMemo<GridColDef<IProduct>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "image",
        headerName: "Image",
        flex: 1,
        minWidth: 150,
        renderCell: ({ value }) => (
          <ProductImagePreview image={value} width={40} height={40} />
        ),
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        flex: 1,
        minWidth: 150,
        renderCell: ({ value }) =>
          value ? format(new Date(value), "dd-MM-yyyy") : "",
      },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 150,
        renderCell: ({ value }) => (
          <Chip
            label={value == "1" ? "Active" : "Inactive"}
            sx={{
              bgcolor: value == "1" ? "#44cf6c" : "#f9cb40",
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
    ],
    [handleDelete, handleModal],
  );

  const listOfData = useMemo(() => {
    const search = deferredSearch.toLowerCase();
    if (!search) return data ?? [];
    return (data ?? []).filter((item) =>
      item.name.toLowerCase().includes(search),
    );
  }, [data, deferredSearch]);

  const handleSelectChange = useCallback(
    (ids: number[], isUnselectAll?: boolean) => {
      setSelectedIds(isUnselectAll ? [] : ids);
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
              await toggleStatusApi({
                ids: selectedIds,
                status: isActivate ? 1 : 0,
              }).unwrap();
              setSelectedIds([]);
              confirmService.close();
              snackBar?.open({
                type: "success",
                message: "Successfully update",
              });
            } catch (error) {
              console.log(error);
            }
          },
        });
    },
    [selectedIds, confirmService, toggleStatusApi, snackBar],
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <Box className="mb-7">
        <Typography variant="h3" className="heading">
          Products
        </Typography>

        <Stack direction="row" className="flex-between mt-6" spacing={2}>
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

export default React.memo(ProductIndex);
