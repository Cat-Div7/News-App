import Button from "@mui/material/Button";
import { NewsArticle, NewsFeed, ThemeSwitcher } from "@components";

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="mx-auto flex w-full flex-col justify-center px-3 sm:px-4 md:max-w-3xl lg:max-w-2xl">
        <Button variant="contained">Save</Button>
        <NewsFeed>
          <NewsArticle />
        </NewsFeed>

        <ThemeSwitcher />
      </div>
    </div>
  );
}

export default App;
