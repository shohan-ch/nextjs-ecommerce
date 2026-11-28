"use client";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  label?: string;
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

const createVideoThumbnail = (file: File, onLoad: (src: string) => void) => {
  const video = document.createElement("video");
  const url = URL.createObjectURL(file);
  video.onloadedmetadata = () => (video.currentTime = Math.min(0.1, video.duration / 2));
  video.onseeked = () => {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    onLoad(canvas.toDataURL());
    URL.revokeObjectURL(url);
  };
  video.onerror = () => URL.revokeObjectURL(url);
  video.src = url;
};

const UploadByDrop = ({
  field,
  isMultiple = false,
  label = "Files",
}: Props) => {
  const [previews, setPreviews] = React.useState<Preview[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFiles = (files: FileList | File[]) => {
    const selectedFiles = Array.from(files);
    if (selectedFiles.length === 0) return;

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
      if (preview.file.type.startsWith("video/")) {
        createVideoThumbnail(preview.file, (src) =>
          setPreviews((current) =>
            current.map((item) =>
              item.id === preview.id ? { ...item, src } : item,
            ),
          ),
        );
        return;
      }

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
  };

  const handleRemove = (previewId: string) => {
    const remaining = previews.filter((preview) => preview.id !== previewId);
    setPreviews(remaining);
    field.onChange(
      isMultiple ? remaining.map((preview) => preview.file) : null,
    );
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <>
      {label && (
        <Typography variant="body2" sx={styles.label}>
          {label}
        </Typography>
      )}

      <Box
        sx={{
          minHeight: 150,
          border: "1px dashed",
          borderColor: isDragging ? "primary.main" : "divider",
          borderRadius: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.25,
          px: 2,
          py: 1.5,
          bgcolor: isDragging ? "action.hover" : "background.paper",
        }}
        onDragEnter={(event: React.DragEvent<HTMLDivElement>) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event: React.DragEvent<HTMLDivElement>) =>
          event.preventDefault()
        }
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <ImageOutlinedIcon sx={styles.dropIcon} />
        <Typography variant="body2" sx={styles.dropText}>
          Drag & drop {label.toLowerCase()} here
        </Typography>
        <Typography variant="body2" sx={styles.orText}>
          or
        </Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={styles.uploadButton}
        >
          Upload {label}
          <VisuallyHiddenInput
            type="file"
            onChange={(event) =>
              event.target.files && handleFiles(event.target.files)
            }
            multiple={isMultiple}
          />
        </Button>
      </Box>

      {previews.length > 0 && (
        <Box component="ul" sx={styles.uploadList}>
          {previews.map((preview) => (
            <Box component="li" key={preview.id} sx={styles.uploadItem}>
              <Box sx={styles.preview}>
                {preview.src &&
                (preview.file.type.startsWith("image/") ||
                  preview.file.type.startsWith("video/")) ? (
                  <Box
                    component="img"
                    src={preview.src}
                    alt={preview.file.name}
                    sx={styles.previewImage}
                  />
                ) : (
                  <Typography variant="caption">File</Typography>
                )}
                {preview.file.type.startsWith("video/") && (
                  <PlayArrowRoundedIcon sx={styles.playIcon} />
                )}
              </Box>
              <Button
                aria-label={`Remove ${preview.file.name}`}
                color="inherit"
                size="small"
                onClick={() => handleRemove(preview.id)}
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

export default UploadByDrop;

const styles: Record<string, SxProps<Theme>> = {
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: "13px",
    mb: 1.5,
    display: "block",
  },
  dropIcon: {
    color: "primary.main",
    fontSize: 28,
  },
  dropText: {
    color: "text.primary",
    fontWeight: 600,
  },
  orText: {
    color: "text.secondary",
    fontSize: 12,
  },
  uploadButton: {
    mt: 0.5,
  },
  uploadList: {
    listStyle: "none",
    m: 0,
    mt: 1.5,
    p: 0,
    pb: 1,
    display: "flex",
    flexDirection: "row",
    gap: 1,
    overflowX: "auto",
    overflowY: "hidden",
    scrollbarWidth: "thin", // Firefox
    scrollbarColor: "#bdbdbd transparent",

    "&::-webkit-scrollbar": {
      height: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#bdbdbd",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  },
  uploadItem: {
    position: "relative",
    width: 84,
    height: 84,
    flexShrink: 0,
  },
  preview: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
    border: "1px solid",
    borderColor: "divider",
    borderRadius: 1,
    bgcolor: "action.hover",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  playIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 34,
    height: 34,
    p: 0.25,
    borderRadius: "50%",
    bgcolor: "rgba(0, 0, 0, 0.65)",
    color: "white",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    zIndex: 1,
    minWidth: 28,
    width: 28,
    height: 28,
    p: 0,
    borderRadius: "50%",
    bgcolor: "background.paper",
    color: "text.secondary",
  },
};
