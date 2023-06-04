import { $, useComputed$, useSignal } from "@builder.io/qwik"



export const useCounter = (initialValue: number) => {

    const counter = useSignal(initialValue);

    const incrementCounter = $(() => {
        counter.value++;
    })
    const decrementCounter = $(() => {
        counter.value --;
              
    })

    return {
        counter: useComputed$(()=> counter.value),
        incrementCounter: incrementCounter,
        decrementCounter: decrementCounter
    }

}