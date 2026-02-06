import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export function NewsArticle(props) {
  const { image, title, description, author, publishedAt, url } = props;

  return (
    <StyledCard>
      <CardActionArea
        component="a"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {image && (
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt="Sample article"
          />
        )}

        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title || "Unknown Title"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description || "No description available."}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box p={2}>
        <Typography variant="caption" color="textSecondary" display="block">
          {author || "Unknown Author"}
        </Typography>
        {publishedAt && (
          <Typography variant="caption" color="textSecondary">
            {new Date(publishedAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </StyledCard>
  );
}
