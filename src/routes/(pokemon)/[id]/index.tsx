import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { PokemonImages } from '~/components/pokemons/pokemon-images';

import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$<number>(({params, redirect})=>{
    const id = Number(params.id);
    if(isNaN(id))redirect(301,'/');
    if(id<=0)redirect(301, '/');
    if(id>1002)redirect(301,'/');
    return id;
});

export default component$(() => {
    const pokeId = usePokemonId();

    // const pokemonGame = useContext( PokemonGameContext );
    const { isVisible, showBackImage, toggleShowBack, toggleVisible} = usePokemonGame();

  return<>
    <h2 class="text-5xl text-gray-800"> Pokemon: { pokeId } </h2>
    <PokemonImages
     id={ pokeId.value } 
    isVisible={ isVisible.value}
    backImage={showBackImage.value}/>

    <div class="mt-5">
      <button onClick$={toggleShowBack} class="btn btn-primary mr-2"> Voltear</button>
      
    
      <button onClick$={toggleVisible} class="btn btn-primary">{ isVisible.value ? 'Ocultar' : 'Revelar'}</button>
    </div>
  </>
});

export const head: DocumentHead = {
    title: 'Pokémon ID',
    
  };