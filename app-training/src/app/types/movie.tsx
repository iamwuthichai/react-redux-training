export interface Movie {
  id: number;
  title: string;
  inTheaters: number;
  releaseDate: string;
  poster: string;
  comments: {
    id: number;
    Body: string;
  };
}

export interface CreateMovieDTO {
  title: string;
  inTheaters: number;
  releaseDate: string;
  poster: string;
  comments: {
    id: number;
    Body: string;
  };
}
