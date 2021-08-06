/* eslint-disable @next/next/no-img-element */
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | ig.new</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>
            <span role="img" aria-label="Hello">
              👏
            </span>{' '}
            Olá, Bem vindo
          </span>

          <h1>
            Novidades sobre o mundo do <span>React</span>.
          </h1>
          <p>
            Tenha acesso a todas as publicações <br />
            <span>por {product.amount}/mês</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="avatar" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1JF6aRFsqqmqKOXYEwmVwiqs');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours in seconds
  };
};
