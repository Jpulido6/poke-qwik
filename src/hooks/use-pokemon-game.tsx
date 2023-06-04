import { $, useComputed$, useContext } from "@builder.io/qwik"
import { PokemonGameContext } from "~/context"




export const usePokemonGame = () => {


    const pokemonGame = useContext(PokemonGameContext);



    const changePokeId = $((value: number) => {
        if ((pokemonGame.pokeId + value) <= 0) return;
        pokemonGame.pokeId += value;
    })

    const toggleVisible =$(() =>{

        pokemonGame.isVisible = !pokemonGame.isVisible;

    })

    const toggleShowBack =$(() =>{

        pokemonGame.showBackImage = !pokemonGame.showBackImage;

    })



    return {

        pokeId: useComputed$(() => pokemonGame.pokeId),
        isVisible: useComputed$(() => pokemonGame.isVisible),
        showBackImage: useComputed$(() => pokemonGame.showBackImage),

        nextPokemon: $(()=>changePokeId(+1)),         
        prevPokemon: $(()=>changePokeId(-1)),
        
        toggleVisible  : toggleVisible,
        toggleShowBack :toggleShowBack

    }

}