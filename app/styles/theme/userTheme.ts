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
      light: "#E5E5E5",
    },
    secondary: {
      light: "#f9fafd",
      main: "#f6f6f7",
      dark: "#000000A6",
    },
    text: {
      secondary: "#9b9b9b",
    },

    blue: {
      main: "#1976d2",
    },
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-sizeSmall": {
            height: 34,
            "& .MuiOutlinedInput-input": { paddingTop: 0, paddingBottom: 0 },
          },
        },
      },
    },
    // Keep the floating label aligned too
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)": {
            transform: "translate(14px, 7px)",
          },
        },
      },
    },
  },
});
