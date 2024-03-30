import { useGetPokemonsQuery } from "~/features/pokemon/api";

export function App() {
  const { pokemons } = useGetPokemonsQuery(
    { limit: 20, offset: 0 },
    {
      selectFromResult: ({ data: result, ...other }) => ({
        pokemons: result?.results,
        ...other,
      }),
    },
  );

  return (
    <>
      {pokemons?.map((pokemon) => (
        <div key={pokemon.name}>
          {pokemon.name} -- {pokemon.url}
        </div>
      ))}
    </>
  );
}
