import { component$ } from '@builder.io/qwik';
import type{ DocumentHead } from '@builder.io/qwik-city';
import { useCounter } from '~/hooks/use-Counter';

export default component$(() => {

    const { counter, decrementCounter, incrementCounter} = useCounter(0);

  

    return(
    <>
        <span class="text-2xl">Counter</span>
        <span class="text-7xl">{counter.value}</span>

        <div class="mt-5">
            <button onClick$={()=> decrementCounter() }  class="btn btn-primary mr-2">-1</button>
            
            <button onClick$={()=> incrementCounter()} class="btn btn-primary">+1</button>
        </div>
    </>
    )
});

export const head: DocumentHead = {
    title: 'Counter'
}