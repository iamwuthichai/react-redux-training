import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getMovie, updateMovie } from "../../../app/services/movieService";
import { CreateMovieDTO } from "../../../app/types/movie";

import IndexLayout from "../../../layouts/IndexLayout";

import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  InputLabel,
  Input,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikErrors } from "formik";
import { UploadFile } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

const MovieFormUpdate = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const movieId = Number(id);

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
    mutationFn: (data: CreateMovieDTO) => updateMovie(movieId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      navigate(`/movies/detail/${movieId}`);
    },
  });

  if (isLoading) return <div>Loading movie...</div>;
  if (isError) return <div>Error loading movie</div>;
  if (!movie) return <div>No movie found.</div>;

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
            <Typography variant="h5" mb={2}>
              Edit Movie
            </Typography>

            <Formik
              initialValues={{
                title: movie.title,
                inTheaters: movie.inTheaters,
                releaseDate: movie.releaseDate,
                poster: movie.poster,
              }}
              onSubmit={(values, { resetForm }) => {
                const requestBody: CreateMovieDTO = {
                  ...values,
                  inTheaters: values.inTheaters ? 1 : 0,
                };
                mutation.mutate(requestBody);
                resetForm();
              }}
              validate={(values) => {
                const errors: FormikErrors<CreateMovieDTO> = {};
                if (!values.title) {
                  errors.title = "Required: Title";
                }

                if (!values.releaseDate) {
                  errors.releaseDate = "Required: Release Date";
                }

                if (!values.poster) {
                  errors.poster = "Required: Poster";
                }

                return errors;
              }}
            >
              {({ values, handleChange, setFieldValue }) => (
                <Form>
                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="title">Title</InputLabel>
                    <Input
                      id="title"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="title" />
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="releaseDate"></InputLabel>
                    <Input
                      id="releaseDate"
                      name="releaseDate"
                      type="date"
                      value={
                        values.releaseDate
                          ? values.releaseDate.split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      <ErrorMessage name="releaseDate" />
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="poster">Poster</FormLabel>
                    <Button
                      variant="outlined"
                      component="label"
                      startIcon={<UploadFile />}
                      sx={{ textTransform: "none", mt: 1 }}
                    >
                      Upload Poster
                      <input
                        hidden
                        id="poster"
                        name="poster"
                        type="file"
                        accept="image/*"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          const file = event.currentTarget.files?.[0];
                          if (file) {
                            setFieldValue("poster", file);
                          }
                        }}
                      />
                    </Button>
                    {values.poster && (
                      <Typography variant="body2" mt={1}>
                        Selected: {(values.poster as File).name}
                      </Typography>
                    )}
                    <FormHelperText error>
                      <ErrorMessage name="poster" />
                    </FormHelperText>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <FormControlLabel
                      control={
                        <Field
                          as={Checkbox}
                          name="inTheaters"
                          color="primary"
                          checked={values.inTheaters}
                        />
                      }
                      label="Currently In Theaters"
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? "Pending..." : "Update"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </IndexLayout>
  );
};

export default MovieFormUpdate;
