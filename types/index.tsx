export type Type = {
  name: string;
  url: string;
};

export type TypesType = {
  slot: number;
  type: Type;
};

export type StatsType = {
  base_stat: number;
  effort: number;
  stat:StatType;
};

export type StatType = {
  name: string;
  url: string;
}

export type AbilitiesType = {
  ability: AbilityType;
  is_hidden: boolean;
  slot: number;
}

export type AbilityType = {
  name: string;
  url: string;
};

export type EggGroupType = {
  name: string;
  url: string;
};

export type PokeColorType = {
    name: string;
    url: string;
}

export type FlavorEntriesType = {
  flavor_text: string;
  language: Type;
  version: Type;
}

export type EvolutionDataType = {
  baby_trigger_item: number | null;
  chain: EvolutionChainType;
  id: number;
}

export type EvolutionChainType = {
  evolution_details: EvolutionDetailsType[];
  evolves_to: string[];
  is_baby: boolean; 
  species: Type;
}
export type EvolutionResultType = {
  id: number | undefined;
  species_name: any;
  min_level: any;
  trigger_name: any;
  item: any;
}

export type EvolutionDetailsType = {
  gender: string|number|null;
  held_item: string|number|null;
  item: string|number|null;
  known_move: string|number|null;
  known_move_type: string|number|null;
  location: string|number|null;
  min_affection: string|number|null;
  min_beauty: string|number|null;
  min_happiness: string|number|null;
  min_level: string|number;
  needs_overworld_rain: string|number|false;
  party_species: string|number|null;
  party_type: string|number|null;
  relative_physical_stats: string|number|null;
  time_of_day: string|number|"";
  trade_species: string|number|null;
  trigger: Type;
  turn_upside_down:boolean;

}

export interface PokemonType {
  abilities:[];
  id: number;
  name: string;
  description: string;
  image: string;
  genera: string;
  pokedex_number: string;
  base_experience: number;
  types: TypesType[];
  stats: StatsType[];
  height: number;
  weight: number;
  abilites: AbilityType[];
  gender_rate: number;
  egg_groups: EggGroupType[];
  color: PokeColorType;
  flavor_text_entries: FlavorEntriesType[];
  evolution_chain?:{url:string};

};

export interface PokemonColorType {
  fire?: String;
  grass?: String;
  water?: String;
  normal?: String;
  fighting?: String;
  flying?: String;
  poison?: String;
  ground?: String;
  rock?: String;
  bug?: String;
  ghost?: String;
  steel?: String;
  electric?: String;
  psychic?: String;
  ice?: String;
  dragon?: String;
  dark?: String;
  fairy?: String;
};

export interface RouteParamsType {
  itemId: number;
  pokemonDetails: PokemonType;
}

export interface RouteType {
  route: {
    key? : string;
    name? : string;
    params :RouteParamsType;
    path? : string;
  }
}

export interface CardProps {
  data: PokemonType[];
  onPress: (arg: PokemonType) => void;
  removePokemon?: (arg: number) => void;
}

export interface DetailsTabPropsType {
    data?: PokemonType;
    height: number;
    weight: number;
    experience: number;
    abilities: AbilitiesType[];
    stats?:StatsType[];
}

export interface FiltersType {
  id: number;
  name: string;
  active: boolean;
  value: number;
}