import { NewsFeed, NewsHeader } from "@components";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { debounce } from "lodash";
import { Button, styled, Typography } from "@mui/material";

const Footer = styled("div")(({ theme }) => ({
  margin: theme.spacing(2, 0),
  display: "flex",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  // Data Fetching Function
  const loadData = async () => {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/top-headlines?q=${encodeURIComponent(queryValue.current)}&page=${pageNumber.current}&max=${PAGE_SIZE}&country=eg&lang=ar&apikey=${import.meta.env.VITE_NEWS_API_KEY}`,
      );

      // Check if the HTTP response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check for API-specific errors
      if (data.errors && data.errors.length > 0) {
        throw new Error(data.errors[0]);
      }

      // Check if articles exist
      if (!data.articles || data.articles.length === 0) {
        return [];
      }

      return data.articles.map((article) => ({
        title: article.title,
        description: article.description,
        author: article.source?.name,
        publishedAt: article.publishedAt,
        image: article.image,
        url: article.url,
      }));
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error; // Re-throw to handle in the calling component
    }
  };

  const fetchAndUpdateArticles = useCallback(() => {
    setLoading(true);
    setError("");
    loadData()
      .then(setArticles)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Debounced Search Function
  const debouncedLoadData = useMemo(
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
    if (pageNumber.current <= 1) return;
    pageNumber.current -= 1;
    fetchAndUpdateArticles();
  };

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="mx-auto flex w-full flex-col justify-center px-3 sm:px-4 md:max-w-3xl lg:max-w-2xl">
        <NewsHeader onSearchChange={handleSearchChange} />
        {error.length === 0 && (
          <NewsFeed articles={articles} loading={loading} />
        )}
        {error.length && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Footer>
          <Button
            variant="outlined"
            onClick={handlePreviousClick}
            disabled={pageNumber.current === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextClick}
            disabled={
              loading || !articles.length || articles.length < PAGE_SIZE
            }
          >
            Next
          </Button>
        </Footer>
      </div>
    </div>
  );
}

export default App;
