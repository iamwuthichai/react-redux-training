import * as React from "react";
import {
  Card,
  Grid,
  Typography,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
  Box,
} from "@mui/material";
import { useGetMoviesQuery } from "../movieApi";

const recordsPerPage = 20;

const ComponentMovieList = () => {
  const [page, setPage] = React.useState(1);

  const { data, error, isLoading } = useGetMoviesQuery({
    page,
    pageSize: recordsPerPage,
  });

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) return <div style={{ margin: 0 }}>Loading...</div>;

  if (error) return <div>Error loading movies</div>;

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
              <Card sx={{ maxWidth: 345, margin: "15px" }}>
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
      </Box>
    </>
  );
};

export default ComponentMovieList;
