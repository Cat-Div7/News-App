import { AppBar, Toolbar, Typography } from "@mui/material";

export function NewsHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">NewsFeed App</Typography>
      </Toolbar>
    </AppBar>
  );
}
