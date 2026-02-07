import { NewsArticle } from "@components";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Fragment } from "react";

export function NewsFeed(props) {
  const { articles, loading } = props;

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!articles?.length) {
    return (
      <Typography
        align="center"
        variant="h6"
        color="textSecondary"
        marginTop={4}
      >
        No articles found
      </Typography>
    );
  }

  return (
    <div>
      {articles?.map((article) => {
        return (
          <Fragment key={JSON.stringify(article)}>
            <NewsArticle {...article} />
          </Fragment>
        );
      })}
    </div>
  );
}
