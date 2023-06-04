import { createContextId } from "@builder.io/qwik";
import type{ SmallPokemon } from "~/interfaces";



export interface PokemoListGame{

    currentPage: number,
    isLoading: boolean,
    pokemons: SmallPokemon[]
}

export const PokemonListContext = createContextId<PokemoListGame>('pokemon.list-context');