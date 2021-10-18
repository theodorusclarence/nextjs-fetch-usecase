export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonData {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<Pokemon>;
}

export interface Types {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonDetail {
  types: Types[];
  weight: number;
  forms: {
    name: string;
    url: string;
  }[];
  abilities: Ability[];
}
