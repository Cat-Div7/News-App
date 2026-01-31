import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@context";

export default function AppMuiThemeProvider({ children }) {
  const { theme } = useTheme();

  const muiTheme = createTheme({
    palette: {
      mode: theme, // light | dark
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
