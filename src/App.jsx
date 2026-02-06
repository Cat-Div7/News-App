import { NewsArticle, NewsFeed, ThemeSwitcher, NewsHeader } from "@components";
import { useEffect, useState } from "react";
import { debounce } from "lodash";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (inputQuery) => {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?q=${encodeURIComponent(inputQuery)}&country=eg&lang=ar&apikey=${import.meta.env.VITE_NEWS_API_KEY}`,
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

  // Debounced Search Function
  const debouncedLoadData = debounce((newQuery) => {
    setLoading(true);

    loadData(newQuery)
      .then(setArticles)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, 500);

  // Fetch Data on Initial Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadData("");
        setArticles(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle Search Input Changes
  const handleSearchChange = (newQuery) => {
    debouncedLoadData(newQuery);
  };

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="mx-auto flex w-full flex-col justify-center px-3 sm:px-4 md:max-w-3xl lg:max-w-2xl">
        <NewsHeader onSearchChange={handleSearchChange} />
        <NewsFeed articles={articles} loading={loading} />
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
}

export default App;
