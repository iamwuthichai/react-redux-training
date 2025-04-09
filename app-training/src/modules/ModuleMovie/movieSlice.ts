import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  selectedMovieId: number | null;
}

const initialState: MovieState = {
  selectedMovieId: null,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    selectMovie: (state, action: PayloadAction<number>) => {
      state.selectedMovieId = action.payload;
    },
  },
});

export const { selectMovie } = movieSlice.actions;
export default movieSlice.reducer;
