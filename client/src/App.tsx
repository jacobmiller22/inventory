import { CssBaseline, ThemeProvider } from "@mui/material";
import ProfileProvider from "contexts/auth";
import "globals.css";
import theme from "theme";
import Router from "./Router";

const App = () => {
  return (
    <ProfileProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router />
      </ThemeProvider>
    </ProfileProvider>
  );
};

export default App;
