import { createTheme } from "@mui/material";

export const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#ff3a29",
    },
    secondary: {
      light: "#f6f6f7",
      main: "#ffffff",
      dark: "#000000A6",
    },
    text: {
      secondary: "#9b9b9b",
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
