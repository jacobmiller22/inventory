import { createTheme, Palette } from "@mui/material";
import { light } from "./palette";

export type Theme = {
  palette: Palette;
  layout: {
    contentWidth: string;
  };
  typography: {
    fontFamily: string;
  };
  zIndex: {
    appBar: number;
    drawer: number;
  };
};

//@ts-ignore
const theme: Theme = createTheme({
  palette: light,
  //@ts-ignore
  layout: {
    contentWidth: "1000px",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default theme;
