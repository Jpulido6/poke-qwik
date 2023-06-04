import { $, component$, useComputed$, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city'
import { Loader } from '~/components/loader/loader';
import { PokemonImages } from '~/components/pokemons/pokemon-images';
import { Modal } from '~/components/shared/modal/Modal';
import { responseChatGPT } from '~/helpers/get-chat-open-ai-response';
import { getSmallPokemn } from '~/helpers/get-small-pokemon';
import { type SmallPokemon } from '~/interfaces';


export const usePokeList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = Number(query.get('offset') || '0');
  if (offset < 0) redirect(301, pathname);
  if (isNaN(offset)) redirect(301, pathname);

  return getSmallPokemn(offset);




});

export default component$(() => {

  const pokeList = usePokeList();
  const location = useLocation();
  const modalVisible = useSignal(false);
  const openAIResponse = useSignal('')

  const modalPokemon = useStore({
    id: '',
    name: ''
  });

  const handleShowModal = $((id: string, name: string) => {
    modalPokemon.id = id;
    modalPokemon.name = name;
    modalVisible.value = true;
  })
  const handleCloseModal = $(() => {
    modalVisible.value = false;
  })


  useVisibleTask$(({ track }) => {
    track(() => modalPokemon.name);
    openAIResponse.value =''

    if ( modalPokemon.name.length > 0 ) {
      responseChatGPT(modalPokemon.name)
      .then(res => openAIResponse.value= res);
    }
  })


  const currentOffSet = useComputed$(() => {
    const OffSet = new URLSearchParams(location.url.search);
    return Number(OffSet.get('offset') || 0);
  })



 

  return (
    <>
      <div class="flex flex-col">
        <span class="text-5xl my-5">Status</span>
        <span>Página Actual: {currentOffSet}</span>
        <span>{location.isNavigating ? <Loader/> : ''}</span>
      </div>

      <div class="mt-10">
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffSet.value - 12}`}
          class="btn btn-primary mr-2" >Anterior
        </Link>
        <Link
          href={`/pokemons/list-ssr/?offset=${currentOffSet.value + 12}`}
          class="btn btn-primary">Siguiente
        </Link>
      </div>

      <div class="grid grid-cols-6 mt-5">

        {

          pokeList.value.map(({ name, id }) => (
            <div
              key={name}
              onClick$={() => handleShowModal(id, name)}
              class=" flex flex-col m-5 justify-center items-center">
              <PokemonImages id={id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }


      </div>

      <Modal showModal={modalVisible.value} closeModal={handleCloseModal}>
        <div q:slot='tittle' class="">{modalPokemon.name}</div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImages id={modalPokemon.id} />
          <span>
            {openAIResponse.value=='' ?<Loader/> : openAIResponse}
          </span>
        </div>


      </Modal>

    </>
  )
});
export const head: DocumentHead = {
  title: 'List SSR',
  meta: [
    {
      name: 'description',
      content: 'First page with qwik',
    },
  ],
};


