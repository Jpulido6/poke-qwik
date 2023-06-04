import { Slot, component$ } from '@builder.io/qwik';

import NavBar from '~/components/shared/NavBar/Navbar';
import Footer from '~/components/shared/footer/footer';
import { PokemonProvider } from '~/context';

export default component$(() => {
  return(
    <>
     <PokemonProvider>
      <NavBar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
      <Footer />
    </PokemonProvider>
    </>
  )
});