import { configureStore } from '@reduxjs/toolkit';
import { movieApi } from '../modules/ModuleMovie/movieApi';
import movieReducer from '../modules/ModuleMovie/movieSlice';

export const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
