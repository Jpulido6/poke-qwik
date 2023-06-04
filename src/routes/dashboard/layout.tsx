import { Slot, component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/NavBar/Navbar';



export default component$(() => {
    return (
        <>
            <Navbar/>    
            <div class="flex flex-col justify-center items-center mt-10">

                <span class="text-4xl text-gray-500">Dashboard</span>

                <Slot />
            </div>

        </>
    )
});

export const head: DocumentHead = {
    title: 'Dashboard',

};