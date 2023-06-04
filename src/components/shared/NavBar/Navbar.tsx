import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { QwikLogo } from '../../icons/qwik';
import styles from './NavBar.module.css';

export default component$(() => {
  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <Link href='/'>
            <QwikLogo height={80} width={50} />
          </Link>
        </div>
        <ul>
          <Link href='/login/'>Login</Link>
          <Link href='/dashboard/'>Dashboard</Link>
          <Link href='/list-ssr/'>SSR</Link>
          <Link href='/list-client/'>Client</Link>
          <Link href='/counter/'>Counter</Link>
        
        </ul>
      </div>
    </header>
  );
});
