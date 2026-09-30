import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    blue?: PaletteOptions["primary"];
  }
}

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
      dark: "#E5E5E5",
    },
    text: {
      secondary: "#9b9b9b",
    },

    blue: {
      main: "#1976d2",
    },
  },
});
