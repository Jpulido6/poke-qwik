import {  component$,  } from '@builder.io/qwik';
import {type DocumentHead, useNavigate } from '@builder.io/qwik-city';

import { PokemonImages } from '~/components/pokemons/pokemon-images';

import { usePokemonGame } from '~/hooks/use-pokemon-game';


export default component$(() => {
  // const pokeId = useSignal(1);
  // const showBackImage = useSignal(false);
  // const isBlur = useSignal(true);
  const nav = useNavigate();



  const {
    pokeId,
    isVisible,
    showBackImage,

    nextPokemon,
    prevPokemon,
    toggleShowBack,
    toggleVisible

    
  } = usePokemonGame();


 

  return (
    <>
      <span class="text-5xl">Buscador Pokémon</span>
      <span class="text-9xl">{ pokeId.value }</span>

      <div onClick$={()=> nav(`./pokemons/${ pokeId.value }`) }>
        <PokemonImages id={ pokeId.value } backImage={ showBackImage.value } isVisible={ isVisible.value } />

      </div>

      <div class="mt-2">
        <button onClick$={ prevPokemon } class="btn btn-primary mr-2" >Anterior</button>
        <button onClick$={ nextPokemon } class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={toggleShowBack} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={ toggleVisible } class="btn btn-primary ">{ isVisible.value ? 'Ocultar' : 'Revelar'}</button>

      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'First page with qwik',
    },
  ],
};
