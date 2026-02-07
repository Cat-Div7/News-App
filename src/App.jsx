import { NewsArticle, NewsFeed, NewsHeader } from "@components";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Button, styled } from "@mui/material";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  // Data Fetching Function
  const loadData = async () => {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?q=${encodeURIComponent(queryValue.current)}&page=${pageNumber.current}&max=5&country=eg&lang=ar&apikey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );

    const data = await response.json();
    return data?.articles?.map((article) => ({
      title: article.title,
      description: article.description,
      author: article.source?.name,
      publishedAt: article.publishedAt,
      image: article.image,
      url: article.url,
    }));
  };

  const fetchAndUpdateArticles = useCallback(() => {
    setLoading(true);
    loadData()
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Debounced Search Function
  const debouncedLoadData = useCallback(
    () => debounce(fetchAndUpdateArticles, 500),
    [fetchAndUpdateArticles],
  );

  // Fetch Data on Initial Load
  useEffect(() => {
    fetchAndUpdateArticles();
  }, [fetchAndUpdateArticles]);

  // Handle Search Input Changes
  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1; // Reset to first page on new search
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  // Handle Pagination (Next/Previous)
  const handleNextClick = () => {
    pageNumber.current += 1;
    fetchAndUpdateArticles();
  };
  const handlePreviousClick = () => {
    if (pageNumber.current > 1) {
      pageNumber.current -= 1;
      fetchAndUpdateArticles();
    }
  };

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="mx-auto flex w-full flex-col justify-center px-3 sm:px-4 md:max-w-3xl lg:max-w-2xl">
        <NewsHeader onSearchChange={handleSearchChange} />
        <NewsFeed articles={articles} loading={loading} />
        <Footer>
          <Button variant="outlined" onClick={handlePreviousClick}>
            Previous
          </Button>
          <Button variant="outlined" onClick={handleNextClick}>
            Next
          </Button>
        </Footer>
      </div>
    </div>
  );
}

export default App;
