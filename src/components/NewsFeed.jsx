import { NewsArticle } from "@components";
import { Fragment } from "react";

export function NewsFeed(props) {
  const { articles } = props;
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
