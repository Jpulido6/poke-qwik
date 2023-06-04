import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, type DocumentHead, routeAction$ } from '@builder.io/qwik-city';


export const useFormLogin= routeAction$((data, {cookie, redirect})=>{
   const { email, password} = data;
   
   if(email==='carlos@gmail.com' && password ==='0611'){
    cookie.set('jwt','as-dasjkj12j35b542kj242bbb2c2',{secure: true, path:'/'})
    redirect(302,'/')
    
  }
  return {success: false}
})

export default component$(() => {

  const accion =useFormLogin ()

    useStylesScoped$(styles);

    return (
        <Form action={accion}
        class="login-form mt-5">
            <div class="relative" >
                <input name="email" type="text" placeholder="Email address" />
                <label for="email">Email Address</label>
            </div>
            <div class="relative">
                <input id="password" name="password" type="password" placeholder="Password" />
                <label for="password">Password</label>
            </div>
            <div class="relative">
                <button>Ingresar</button>
            </div>


            <code>
                { JSON.stringify( accion.value, undefined , 2 ) }
            </code>
        </Form>
    )
});
export const head: DocumentHead = {
    title: 'Login',
    
  };