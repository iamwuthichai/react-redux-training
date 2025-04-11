import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Movie {
  id: number;
  title: string;
  inTheaters: boolean;
  releaseDate: string;
  poster: string | null;
}

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    getMovies: builder.query<{ data: Movie[]; total: number; totalPages: number; }, { page: number; pageSize: number }>({
      query: ({ page, pageSize }) => `movies?page=${page}&recordsPerPage=${pageSize}`,
    }),
  }),
});

export const { useGetMoviesQuery } = movieApi;
