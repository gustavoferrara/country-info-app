import Link from 'next/link';

import styles from '@/styles/404.module.scss';

const PageNotFound: React.FC = () => {
  return (
    <main className={styles.container}>
      <h1>Whoops... page not found</h1>
      <Link href={'/'}>
        <a className={styles.link}>Back to the home page</a>
      </Link>
    </main>
  );
};

export default PageNotFound;
