import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import { PokemonImages } from '~/components/pokemons/pokemon-images';
import{  PokemonListContext } from '~/context/pokemon/pokemon-list.context';
import { getSmallPokemn } from '~/helpers/get-small-pokemon';



// interface pokemonPageState{
//   current: number;
//   isLoading: boolean;
//   pokemons: SmallPokemon[];
// }
export default component$(() => {

  // const pokemonSate= useStore<pokemonPageState>({
  //   current:0,
  //   isLoading:false,
  //   pokemons:[]
  // })
  const pokemonList = useContext(PokemonListContext);
 

  useTask$(async({track})=>{
    // track(()=>pokemonSate.current)
    // const pokemon = await getSmallPokemn(pokemonSate.current * 12 , 35);
    // pokemonSate.pokemons = [...pokemonSate.pokemons, ...pokemon];
    // pokemonSate.isLoading = false;

    track(() => pokemonList.currentPage)
    const pokemon = await getSmallPokemn( pokemonList.currentPage *12 , 35);
    pokemonList.pokemons = [ ...pokemonList.pokemons, ...pokemon]
    pokemonList.isLoading = false;
  })

  useOnDocument('scroll',$(()=>{
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;
    console.log(maxScroll, currentScroll)
    // if((currentScroll + 200)>= maxScroll && !pokemonSate.isLoading){
    //   pokemonSate.isLoading= true
    //   pokemonSate.current ++;}

    if((currentScroll +200)>= maxScroll && !pokemonList.isLoading){
      pokemonList.isLoading = true;
      pokemonList.currentPage ++
    }
    
   
  }))

  return(
    <>
      <div class="flex flex-col">
        <span class="text-5xl my-5">Status</span>
        {/* <span>Página Actual: { pokemonSate.current}</span> */}
        <span>Página Actual: { pokemonList.currentPage}</span>
        <span>Cargando....</span>
      </div>

      <div class="mt-10">
        <button
          // onClick$={()=> pokemonSate.current --}  
          onClick$={()=> pokemonList.currentPage --}         
          class="btn btn-primary mr-2" >Anterior
        </button>
        <button 
          // onClick$={()=> pokemonSate.current ++}     
          
          onClick$={()=>pokemonList.currentPage ++} 
          class="btn btn-primary">Siguiente
        </button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
       {
          // pokemonSate.pokemons.map(({ name, id }) => (
          //   <div key={name} class=" flex flex-col m-5 justify-center items-center">
          //     <PokemonImages id={id}/>
          //     <span class="capitalize">{name}</span>
          //   </div>
          // ))

          pokemonList.pokemons.map(({ name, id }) => (
            <div key={ name } class=" flex flex-col m-5 justify-center items-center">
               <PokemonImages id={ id }/>
             <span class="capitalize">{ name  }</span>
             </div>
          ))
        }
        

      </div>

    </>
  )
});
export const head: DocumentHead = {
  title: 'List Client',
  meta: [
    {
      name: 'description',
      content: 'First page with qwik',
    },
  ],
};