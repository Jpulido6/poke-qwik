import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { type PokemonGameState, PokemonGameContext } from "./pokemon-game-context";
import { type PokemoListGame, PokemonListContext } from "./pokemon-list.context";



export const PokemonProvider = component$(() => {

    const pokemonGame = useStore<PokemonGameState>({
        pokeId:1,
        showBackImage: false,
        isVisible:false
      });
    
      const pokemonList = useStore<PokemoListGame>({
        currentPage:0,
        isLoading:false,
        pokemons: []
      });


      useVisibleTask$(() =>{
        if(localStorage.getItem('pokemonGame')){
           const {
            pokeId = 10,
            isVisible= true,
            showBackImage= false
           } = JSON.parse(localStorage.getItem('pokemonGame')!)as PokemonGameState;

           pokemonGame.pokeId = pokeId;
           pokemonGame.isVisible = isVisible;
           pokemonGame.showBackImage = showBackImage;
        }
      })
      useVisibleTask$(({ track }) =>{

        track(() =>{ pokemonGame.pokeId, pokemonGame.isVisible, pokemonGame.showBackImage})

        localStorage.setItem('pokemonGame',JSON.stringify(pokemonGame));
        
      })

    useContextProvider(PokemonGameContext,pokemonGame); 
    useContextProvider(PokemonListContext, pokemonList);


  return <Slot/>;
});