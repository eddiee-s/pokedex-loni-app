import { configureStore } from "@reduxjs/toolkit";
import { pokemonsApi } from "./features/api/pokemons-api-slice";
import pokemonReducer from "./features/slices/pokeSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    [pokemonsApi.reducerPath]: pokemonsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(pokemonsApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
