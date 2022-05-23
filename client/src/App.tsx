import { CssBaseline, Snackbar, ThemeProvider } from "@mui/material";
import ProfileProvider from "contexts/auth";
import "globals.css";
import { SnackbarProvider } from "notistack";
import theme from "theme";
import Router from "./Router";

const App = () => {
  return (
    <ProfileProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={6}>
          <CssBaseline />
          <Router />
        </SnackbarProvider>
      </ThemeProvider>
    </ProfileProvider>
  );
};

export default App;
