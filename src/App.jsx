import { NewsArticle, NewsFeed, ThemeSwitcher, NewsHeader } from "@components";
import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");

  const loadData = async (inputQuery) => {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?q=${encodeURIComponent(inputQuery)}&country=eg&lang=ar&apikey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );

    const data = await response.json();
    console.log(data);
    return data?.articles?.map((article) => ({
      title: article.title,
      description: article.description,
      author: article.source?.name,
      publishedAt: article.publishedAt,
      image: article.image,
      url: article.url,
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(query).then(setArticles).catch(console.error);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="mx-auto flex w-full flex-col justify-center px-3 sm:px-4 md:max-w-3xl lg:max-w-2xl">
        <NewsHeader onSearchChange={setQuery} />
        <NewsFeed articles={articles} />
        {/* <ThemeSwitcher /> */}
      </div>
    </div>
  );
}

export default App;
