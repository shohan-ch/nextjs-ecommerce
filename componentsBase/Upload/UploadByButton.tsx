"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import type { SxProps, Theme } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Controller, ControllerRenderProps } from "react-hook-form";

type Props = {
  label: string;
  isMultiple?: boolean;
  field: ControllerRenderProps;
};

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Preview = {
  id: string;
  file: File;
  src: string;
};

const UploadByButton = ({ field, label, isMultiple = false }: Props) => {
  const [previews, setPreviews] = React.useState<Preview[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    field: ControllerRenderProps,
  ) => {
    const files = e.target.files;
    if (files) {
      const selectedFiles = Array.from(files);
      const uploadFiles = isMultiple
        ? [...(Array.isArray(field.value) ? field.value : []), ...selectedFiles]
        : selectedFiles[0];
      const newPreviews = selectedFiles.map((file) => ({
        id: `${file.name}-${file.lastModified}-${Math.random()}`,
        file,
        src: "",
      }));

      setPreviews((current) =>
        isMultiple ? [...current, ...newPreviews] : newPreviews,
      );
      field.onChange(uploadFiles);

      newPreviews.forEach((preview) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviews((current) =>
            current.map((item) =>
              item.id === preview.id
                ? { ...item, src: String(reader.result) }
                : item,
            ),
          );
        };
        reader.readAsDataURL(preview.file);
      });
    }
  };

  const handleRemove = (previewId: string, field: ControllerRenderProps) => {
    const remaining = previews.filter((preview) => preview.id !== previewId);
    setPreviews(remaining);
    field.onChange(
      isMultiple ? remaining.map((preview) => preview.file) : null,
    );
  };

  return (
    <>
      <Typography variant="body2" sx={styles.label}>
        {label}
      </Typography>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => handleChange(e, field)}
          multiple={isMultiple}
        />
      </Button>

      {previews.length > 0 && (
        <Box component="ul" sx={styles.uploadList}>
          {previews.map((preview) => (
            <Box component="li" key={preview.id} sx={styles.uploadItem}>
              <Box sx={styles.preview}>
                {preview.src && preview.file.type.startsWith("image/") ? (
                  <Box
                    component="img"
                    src={preview.src}
                    alt={preview.file.name}
                    sx={styles.previewImage}
                  />
                ) : (
                  <Typography variant="caption">File</Typography>
                )}
              </Box>
              <Box sx={styles.fileName}>
                <Typography variant="body2" noWrap>
                  {preview.file.name}
                </Typography>
              </Box>
              <Button
                aria-label={`Remove ${preview.file.name}`}
                color="inherit"
                size="small"
                onClick={() => handleRemove(preview.id, field)}
                sx={styles.removeButton}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

export default UploadByButton;

const styles: Record<string, SxProps<Theme>> = {
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: "13px",
    mb: 1.5,
    display: "block",
  },
  uploadList: {
    listStyle: "none",
    m: 0,
    mt: 2,
    p: 0,
    width: "100%",
    maxWidth: 420,
  },
  uploadItem: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    p: 1,
    mb: 1,
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 1,
  },
  preview: {
    width: 48,
    height: 48,
    flexShrink: 0,
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    bgcolor: "action.hover",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  fileName: { flex: 1, minWidth: 0 },
  removeButton: { minWidth: 36, p: 0.75 },
};
