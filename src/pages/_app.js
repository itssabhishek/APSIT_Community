import "../styles/globals.css";
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material";
import { wrapper } from "../../redux/store";

let theme = createTheme({
  typography: {
    fontFamily: ['"Poppins"', "Roboto", "Arial", "sans-serif"].join(","),
  },
});

theme = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
