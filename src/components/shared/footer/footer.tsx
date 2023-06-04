import { component$ } from '@builder.io/qwik';
import { useServerTimeLoader } from '~/routes/layout';
import styles from './footer.module.css';

export default component$(() => {
  const serverTime = useServerTimeLoader();
  
  return (
    <footer>
      
      <div class="container">
        <a href="https://www.instagram.com/j.pulido6" target="_blank" class={styles.anchor}>
          <span class="text-gray-700">Made with ♡ by jpulido6</span>
          <span class={styles.spacer}>|</span>
          <span class="text-gray-700">{serverTime.value.date}</span>
        </a>
      </div>
    </footer>
  );
});
