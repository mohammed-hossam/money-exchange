import { ReactNode } from 'react';
import styles from './Layout.module.scss';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <main>
      <section className={`${styles.section}`}>
        <header className={`${styles.header}`}>
          <h1>MONEY EXCHANGE</h1>
        </header>
        <div className={`${styles.paper}`}>{children}</div>
      </section>
    </main>
  );
}

export default Layout;
