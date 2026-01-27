import Button from "@mui/material/Button";
import { NewsArticle } from "@components";

function App() {
  return (
    <>
      <div className="m-1 flex justify-center flex-col">
        <Button variant="contained">Save</Button>
        <NewsArticle/>
      </div>
    </>
  );
}

export default App;
