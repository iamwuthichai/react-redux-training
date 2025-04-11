import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
  Box,
  Fab,
  Zoom,
} from "@mui/material";
import { useGetMoviesQuery } from "../movieApi";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../../../components/Loading";
import FetchDataError from "../../../components/FetchDataError";
const recordsPerPage = 20;

const ComponentMovieList = () => {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(1);

  const { data, error, isLoading } = useGetMoviesQuery({
    page,
    pageSize: recordsPerPage,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <FetchDataError />;
  }

  return (
    <>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ flexGrow: 1 }}
        >
          {data?.data.map((movie) => (
            <Grid key={movie.id} item xs={2} sm={4} md={4}>
              <Card
                sx={{ width: 300, maxWidth: 300, margin: "15px" }}
                onClick={() => navigate(`/movies/detail/${movie.id}`)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300"
                    image={movie.poster || "/images/poster/placeholder.jpg"}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {movie.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      วันที่ฉาย {movie.releaseDate}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(data?.totalPages || 0 / recordsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>

        <Zoom in unmountOnExit>
          <Fab
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
            }}
            aria-label="Add"
            color="primary"
            onClick={() => navigate("/movies/create")}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </Box>
    </>
  );
};

export default ComponentMovieList;
