import "../styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { wrapper } from "../../redux/store";

const theme = createTheme({
  typography: {
    fontFamily: ['"Poppins"', "Roboto", "Arial", "sans-serif"].join(","),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(MyApp);
