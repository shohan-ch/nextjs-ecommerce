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
import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  GridColDef,
  GridRowSelectionCheckboxParams,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import {
  Delete,
  DeleteOutlineOutlined,
  EditOutlined,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import BaseModal from "@/componentsBase/Modal/BaseModal";
import CreateColorIndex from "./CreateColorIndex";
import { IColor } from "@/types/type";
import { useModalService } from "@/providers/ModalProvider";

type Props = {};

const ColorIndex = (props: Props) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const modal = useModalService();
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 70 },
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
            <IconButton onClick={() => handleDelete(id)} size="small">
              <DeleteOutlineOutlined color="primary" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [
    { id: 1, name: "Brown", colorCode: "Jon", status: 1 },
    { id: 2, name: "Black", colorCode: "Cersei", status: 0 },
    { id: 3, name: "Black", colorCode: "Jaime", status: 0 },
    { id: 4, name: "Stark", colorCode: "Arya", status: 1 },
    { id: 5, name: "White", colorCode: "Daenerys", status: 0 },
    { id: 6, name: "Melisandre", colorCode: null, status: 1 },
    { id: 7, name: "Gray", colorCode: "Ferrara", status: 0 },
    { id: 8, name: "Frances", colorCode: "Rossini", status: 1 },
    { id: 9, name: "Roxie", colorCode: "Harvey", status: 1 },
    { id: 10, name: "sdsRoxie", colorCode: "ddHarvey", status: 0 },
  ];

  const handleDelete = (id: number) => {
    alert("Delete " + id);
  };

  const handleModal = (row?: any) => {
    const data = row ? row : null;
    const title = row ? "Update Color" : "Add Color";

    modal?.open({
      title,
      component: <CreateColorIndex data={data} />,
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
        data={rows}
        columns={columns}
        onSelectchange={handleSelectChange}
        onActivateChange={handleActivate}
        selectedIds={selectedIds}
        isFooter={true}
        // isShowSelection={false}
      />
    </>
  );
};

export default ColorIndex;
