import { useStore } from "react-redux";
import { AppStore } from "~/lib/redux/store";

export default function EndpointTagDisplay() {
  const store = useStore() as AppStore;
  const pokemonProvidedTags = store.getState().api.provided.Pokemon;

  return (
    <div className="ml-10 mt-10 flex flex-col">
      <div className="mb-4 text-xl font-bold">Tag State</div>
      <div className="flex flex-wrap gap-3">
        {Object.keys(pokemonProvidedTags).map((id) => (
          <div
            key={id}
            className="flex h-fit flex-col rounded-xl bg-blue-600 p-3 font-semibold shadow-xl"
          >
            <div className="mb-1 w-fit rounded-xl border-2 border-neutral-500 bg-gray-200 px-3 py-1.5">
              {`{ type: "Pokemon", id: "${id}" }`}
            </div>
            <div className="flex flex-col gap-1 text-white">
              {pokemonProvidedTags[id].map((endpoint) => (
                <div key={id + endpoint} className="font-normal">
                  {endpoint}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
