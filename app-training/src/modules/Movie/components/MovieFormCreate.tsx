import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovie } from "../../../app/services/movieService";
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
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MovieFormCreate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageTemp, setImageTemp] = useState("");

  const mutation = useMutation({
    mutationFn: (data: CreateMovieDTO) => createMovie(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      navigate(`/movies`);
    },
  });

  return (
    <IndexLayout>
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
        <Card>
          {imageTemp && (
            <CardMedia component="img" height="350" image={imageTemp} />
          )}
          <CardContent>
            <Typography variant="h5" mb={2}>
              Create Movie
            </Typography>

            <Formik
              initialValues={{
                title: "",
                inTheaters: false,
                releaseDate: "",
                poster: "",
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
                      value={values.releaseDate}
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
                            setImageTemp(URL.createObjectURL(file));
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
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{ mt: 2 }}
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Pending..." : "Save"}
                    </Button>
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </IndexLayout>
  );
};

export default MovieFormCreate;
