import { NewsArticle, NewsFeed, ThemeSwitcher, NewsHeader } from "@components";
import { useEffect, useState } from "react";

const url = `https://gnews.io/api/v4/top-headlines?country=eg&lang=ar&apikey=${import.meta.env.VITE_NEWS_API_KEY}`;

function App() {
  const [articles, setArticles] = useState([]);
  async function loadData() {
    const response = await fetch(url);

    const data = await response.json();
    return data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      author: article.source?.name,
      publishedAt: article.publishedAt,
      image: article.image,
    }));
  }

  useEffect(() => {
    loadData().then(setArticles).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="mx-auto flex w-full flex-col justify-center px-3 sm:px-4 md:max-w-3xl lg:max-w-2xl">
        <NewsHeader />
        <NewsFeed articles={articles} />
        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default App;
