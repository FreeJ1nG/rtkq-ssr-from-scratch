export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonStat {
  baseStat: number;
  effort: 0;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSprite {
  backDefault: string | null;
  backFemale: string | null;
  backShiny: string | null;
  backShinyFemale: string | null;
  frontDefault: string | null;
  frontFemale: string | null;
  frontShiny: string | null;
  frontShinyFemale: string | null;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  isHidden: boolean;
  slot: number;
}

export interface PokemonDetail {
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: PokemonSprite[];
  abilities: PokemonAbility[];
  cries: {
    latest: string;
    legacy: string;
  };
}
