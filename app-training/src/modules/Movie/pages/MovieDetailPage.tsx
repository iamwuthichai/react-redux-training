import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMovie } from "../../../app/services/movieService";
import { createComment } from "../../../app/services/commentService";
import { CreateCommentDTO } from "../../../app/types/comment";

import IndexLayout from "../../../layouts/IndexLayout";

import {
  Typography,
  Box,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../../../components/Loading";
import FetchDataError from "../../../components/FetchDataError";

const MovieDetailPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const movieId = Number(id);
  const [newComment, setNewComment] = useState("");

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
    enabled: !isNaN(movieId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateCommentDTO) => createComment(movieId, data),
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries(["movie", movieId]);
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return <FetchDataError />
  }

  if (!movie) {
    return <FetchDataError />
  }
  // if (isLoading) return <div>Loading movie...</div>;
  // if (isError) return <div>Error loading movie</div>;
  // if (!movie) return <div>No movie found.</div>;

  return (
    <IndexLayout>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="350"
            image={movie.poster}
            alt={movie.title}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Release Date:{" "}
              {new Date(movie.releaseDate).toLocaleDateString("en-CA")}
            </Typography>

            <Box mt={2}>
              <Chip
                label={movie.inTheaters ? "Now Showing" : "Coming Soon"}
                color={movie.inTheaters ? "success" : "default"}
                variant="outlined"
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Comments</Typography>
            <List>
              {movie.comments?.length > 0 ? (
                movie.comments.map((comment) => (
                  <ListItem key={comment.id} disablePadding>
                    <ListItemText primary={`• ${comment.body}`} />
                  </ListItem>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments yet.
                </Typography>
              )}
            </List>

            <Box
              component="form"
              mt={2}
              onSubmit={(e) => {
                e.preventDefault();
                if (newComment.trim()) {
                  mutation.mutate({ movieId: movie.id, body: newComment });
                }
              }}
            >
              <TextField
                label="Add a comment"
                fullWidth
                multiline
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<CommentIcon />}
                fullWidth
                sx={{ mt: 2 }}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Pending..." : "Comment"}
              </Button>

              <ButtonGroup variant="contained" fullWidth>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  startIcon={<ArrowBackIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate("/movies")}
                >
                  {mutation.isPending ? "Pending..." : "Back"}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/movies/update/${movieId}`)}
                >
                  {mutation.isPending ? "Pending..." : "Edit Movie"}
                </Button>
              </ButtonGroup>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </IndexLayout>
  );
};

export default MovieDetailPage;
