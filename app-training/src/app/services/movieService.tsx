import apiService from "./ApiService";
import { Movie, CreateMovieDTO } from "../types/movie";

export const getMovies = async (): Promise<Movie[]> => {
  const res = await apiService.get("/movies");
  return res.data;
};

export const getMovie = async (id: number): Promise<Movie> => {
  const res = await apiService.get(`/movies/${id}`);
  return res.data;
};

export const createMovie = async (data: CreateMovieDTO): Promise<Movie> => {
  const res = await apiService.post("/movies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateMovie = async (
  id: number,
  data: CreateMovieDTO
): Promise<Movie> => {
  const res = await apiService.put(`/movies/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteMovie = async (id: number): Promise<void> => {
  await apiService.delete(`/movies/${id}`);
};
