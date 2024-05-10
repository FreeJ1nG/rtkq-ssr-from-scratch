import api from "~/lib/redux/api";
import {
  GetPokemonDetailParam,
  GetPokemonDetailResponse,
  GetPokemonsParam,
  GetPokemonsResponse,
} from "./types";
import { Pokemon } from "~/models/pokemon";

export const pokemonApi = api.injectEndpoints({
  overrideExisting: import.meta.env.DEV,
  endpoints: (builder) => ({
    getPokemons: builder.query<GetPokemonsResponse, GetPokemonsParam>({
      query: ({ limit, offset }) => ({
        url: `/pokemon?limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map((pokemon) => ({
                type: "Pokemon" as const,
                id: pokemon.name,
              })),
              { type: "Pokemon", id: "LIST" },
            ]
          : [{ type: "Pokemon", id: "LIST" }],
    }),
    getPokemonDetail: builder.query<
      GetPokemonDetailResponse,
      GetPokemonDetailParam
    >({
      query: ({ name }) => ({
        url: `/pokemon/${name}`,
        method: "GET",
      }),
    }),
    createPokemon: builder.mutation<Pokemon, Pokemon>({
      query: (pokemonData) => ({
        url: `/pokemon`,
        method: "POST",
        body: pokemonData,
      }),
    }),
  }),
});

export const {
  useGetPokemonsQuery,
  useLazyGetPokemonsQuery,
  useGetPokemonDetailQuery,
  useLazyGetPokemonDetailQuery,
} = pokemonApi;
