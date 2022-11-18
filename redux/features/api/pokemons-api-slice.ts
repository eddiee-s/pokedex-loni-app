import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonType } from "../../../types";

type dataType = {
  count: number;
  next: string;
  previous: string;
  results: PokemonType[];
};

export const pokemonsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    pokemons: builder.query({
      async queryFn(limit, _queryApi, _extraOptions, fetchWithBQ) {
        const pokemonResult = await fetchWithBQ(`/pokemon?limit=${limit}`);
        if (pokemonResult.error) return { error: pokemonResult.error };
        const pokemon = pokemonResult.data as dataType;
        //TODO: REMOVE CLG
        //console.log(pokemon)
        const pokemonsDeatils = await Promise.all(
          pokemon.results.map((poke: PokemonType) =>
            fetchWithBQ(`pokemon/${poke.name}`)
          )
        );
        const result = pokemonsDeatils.map((r) => r.data);

        return result ? { data: result } : { error: pokemonResult.error };
      },
    }),
    pokemonsDetails: builder.query({
      query: (id) => `/pokemon-species/${id}`,
    }),
    pokemonsEvolutionChain: builder.query({
      query: (url) => `${url}`,
    }),
  }),
});

export const {
  usePokemonsQuery,
  usePokemonsDetailsQuery,
  usePokemonsEvolutionChainQuery,
} = pokemonsApi;
