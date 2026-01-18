export interface Type {
  Id: number;
  Name: string;
}

export interface Ability {
  Id: number;
  Name: string;
  Description?: string;
}

export interface Pokemon {
  Id: number;
  Name: string;
  Height?: number;
  Weight?: number;
  ImageUrl?: string;
  BaseExperience?: number;
  Types?: Type[];
  Abilities?: Ability[];
}

export interface CreatePokemonDto {
  Name: string;
  Height?: number;
  Weight?: number;
  ImageUrl?: string;
  BaseExperience?: number;
  Types: string[];
  Abilities: string[];
}
