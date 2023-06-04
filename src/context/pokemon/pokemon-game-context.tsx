import { createContextId } from "@builder.io/qwik";


export interface PokemonGameState {
    pokeId : number;
    showBackImage: boolean;
    isVisible : boolean;
}


export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');