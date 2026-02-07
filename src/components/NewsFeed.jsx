import { NewsArticle, LoadingArticle } from "@components";
import { Typography } from "@mui/material";
import { Fragment } from "react";

export function NewsFeed(props) {
  const { articles, loading } = props;

  if (!loading && !articles?.length) {
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
      {loading && [...Array(5)].map((_, index) => <LoadingArticle key={index}/>)}
      {!loading && articles?.map((article) => {
        return (
          <Fragment key={JSON.stringify(article)}>
            <NewsArticle {...article} />
          </Fragment>
        );
      })}
    </div>
  );
}
