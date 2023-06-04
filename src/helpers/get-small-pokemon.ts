

import type{ PokemonList, SmallPokemon } from "~/interfaces";



export const getSmallPokemn =async (offset: number=0, limit: number=12): Promise<SmallPokemon[]> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${ limit }&offset=${ offset }`);
  const data = await res.json() as PokemonList;



  return data.results.map(({url, name})=>{
    const segment = url.split('/');
    const id = segment.at(-2)!;
    return {id, name}
  });
}