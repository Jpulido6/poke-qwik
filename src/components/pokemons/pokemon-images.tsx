import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";
import { Loader } from "../loader/loader";


interface Props {
    id: number| string;
    size?: number;
    backImage?: boolean;
    isVisible?: boolean;
}
export const PokemonImages = component$(({ id, size = 200, backImage = false, isVisible  = true}: Props) => {

    const imageLoaded = useSignal(false);

    


    useTask$(({ track }) => {
        track(() => id);
        imageLoaded.value = false;
        
    });

    const imgURL = useComputed$(()=>{
        if(id == '')return
        return ( backImage)
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
        : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    })


    
    return (
        <div class="flex  items-center justify-center"
            style={{height:`${ size }px`, width:`${ size }px`}}>
            {!imageLoaded.value && <span><Loader/></span>}

            <img
                src={imgURL.value}
                alt="Pokémon imagen"
                width={`${size}px`}
                height={''}
                onLoad$={() => imageLoaded.value = true }
                class={
                    [{ 'hidden': !imageLoaded.value,
                      'brightness-0': !isVisible
                    },'transition-all'] 
                }
            />
        </div>

    )
});