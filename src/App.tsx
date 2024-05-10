import { useState } from "react";
import {
  useGetPokemonDetailQuery,
  useGetPokemonsQuery,
} from "~/features/pokemon/api";
import PokemonDetailSection from "./components/PokemonDetailSection";
import EndpointTagDisplay from "./components/EndpointTagDisplay";

export function App() {
  const [limit, setLimit] = useState<number>(20);
  const [selectedPokemonName, setSelectedPokemonName] =
    useState<string>("bulbasaur");

  const { pokemons } = useGetPokemonsQuery(
    { limit, offset: 0 },
    {
      selectFromResult: ({ data: result, ...other }) => ({
        pokemons: result?.results,
        ...other,
      }),
    },
  );

  const { pokemonDetail, isFetching } = useGetPokemonDetailQuery(
    { name: selectedPokemonName },
    {
      skip: selectedPokemonName === "",
      selectFromResult: ({ data: result, ...other }) => ({
        pokemonDetail: result,
        ...other,
      }),
    },
  );

  return (
    <div className="flex flex-col p-10">
      <div className="flex items-center gap-4">
        <select
          className="mb-5 w-fit rounded-xl border border-r-8 border-transparent bg-gray-200 px-4 py-2 outline outline-gray-300"
          value={limit}
          onChange={(e) => setLimit(parseInt(e.target.value, 10))}
        >
          <option value={20}>20</option>
          <option value={40}>40</option>
          <option value={60}>60</option>
          <option value={80}>80</option>
          <option value={100}>100</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {pokemons?.map((pokemon) => (
          <button
            key={pokemon.name}
            className={`rounded-xl px-6 py-2 font-semibold text-white transition-all duration-300 
            ${
              selectedPokemonName === pokemon.name
                ? "bg-red-600"
                : "bg-blue-600"
            }`}
            onClick={() => setSelectedPokemonName(pokemon.name)}
          >
            {pokemon.name}
          </button>
        ))}
      </div>
      <div className="flex flex-row">
        <PokemonDetailSection
          pokemonDetail={pokemonDetail}
          isLoading={isFetching}
        />
        <EndpointTagDisplay />
      </div>
    </div>
  );
}
