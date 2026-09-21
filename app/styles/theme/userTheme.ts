import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

export const userTheme = createTheme({
  typography: {
    fontSize: 14,
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      light: "#f9fafd",
      main: "#f6f6f7",
    },
    text: {
      secondary: "#9b9b9b",
    },
  },
});
