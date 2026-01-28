import Button from "@mui/material/Button";
import { NewsArticle, NewsFeed, ThemeSwitcher } from "@components";

function App() {
  return (
    <div className="min-h-screen bg-white transition-colors dark:bg-black">
      <div className="m-1 mx-auto flex max-w-2xl flex-col justify-center">
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
