export interface Pokemon {
  name: string;
  url: string;
}

export interface Ability {
  name: string;
  url: string;
}

export interface AbilityItem {
  ability: Ability;
  is_hidden: boolean;
  slot: number;
}
export interface Cry {
  latest: string;
  legacy: string;
}

export interface Form {
  name: string;
  url: string;
}

export interface GameIndice {
  name: string;
  url: string;
}
export interface GameIndiceItem {
  game_index: number;
  GameIndice: GameIndice[];
}
export interface Move {
  name: string;
  url: string;
}
export interface MoveLearnMethod {
  name: string;
  url: string;
}
export interface VersionGroup {
  name: string;
  url: string;
}

export interface VersionGroupItem {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: VersionGroup;
}

export interface MoveItem {
  move: Move;
  version_group_details: VersionGroupItem[];
}

export interface Specy {
  name: string;
  url: string;
}
export interface Sprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}
export interface PokemonDescription {
  abilities: AbilityItem[];
  base_experience: number;
  cries: Cry;
  forms: Form[];
  game_indices: GameIndiceItem[];
  height: number;
  held_items: [];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: MoveItem[];
  name: string;
  order: number;
  past_abilities: [];
  past_types: [];
  species: Specy;
  sprites: Sprite;
  weight: number;
}
export interface SearchState {
  searchTerm: string;
  pokemonList: Pokemon[];
  loading: boolean;
  pokemonDetails: PokemonDescription[];
}

export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

