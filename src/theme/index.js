import { createMuiTheme } from "@material-ui/core";


const primary = "#ef7e5f";
const secondary = "#313131";
const white = "#f2f2f2";


const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "3rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.64rem",
    },
    h4: {
      fontSize: "1.5rem"
    },
    h5: {
      fontSize: "1.285rem",
    },
    h6: {
      fontSize: "1.142rem",
    },
  },
  palette: {
    primary: {
      main: primary,
      contrastText: white,
    },
    secondary: {
      main: secondary,
      contrastText: white,
    },
    background: {
      default: "#f1f1f1",
      light: "#f1f1f1",
    },
  }
});

export default theme;

