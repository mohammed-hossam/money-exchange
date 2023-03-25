import Head from 'next/head';
import styles from '@/styles/Home.module.scss';
// import { IoIosSwap } from 'react-icons/io';
// import { QueryClient, dehydrate } from '@tanstack/react-query';
// import { getUnits } from '@/utils/getUnits';
import { CurrencyTypes } from '@/types';
import TextInput from '@/components/textInput/TextInput';
import SelectInput from '@/components/selectInput/SelectInput';
import ResetBtn from '@/components/resetBtn/ResetBtn';
import SwapBtn from '@/components/swapBtn/SwapBtn';
import ResultText from '@/components/resultText/ResultText';
import { getCurrencyTypes } from '@/utils/getCurrencyTypes';

type HomeProps = { currencyTypes: CurrencyTypes };

export default function Home({ currencyTypes }: HomeProps) {
  console.log(currencyTypes);

  return (
    <>
      <Head>
        <title>Money Exchange</title>
        <meta name="description" content="Frontend-Task" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.inputsContainer}`}>
        <TextInput />
        <SelectInput htmlFor="from" label="From" />
        <SwapBtn />
        <SelectInput htmlFor="to" label="To" />
      </div>
      <ResetBtn />
      <ResultText />
      {/* <section className={styles.main}><Exhange />dsdsds</section> */}
    </>
  );
}

export async function getServerSideProps() {
  const data = await getCurrencyTypes();

  console.log(data);
  // Pass data to the page via props
  return { props: { currencyTypes: data } };
}
