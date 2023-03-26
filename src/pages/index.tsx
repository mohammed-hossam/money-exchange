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
import { wrapper } from '@/store';
import { setCurrencyTypes } from '@/store/currencyReducer';

export default function Home() {
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
        <SelectInput htmlFor="from" label="From" type="from" />
        <SwapBtn />
        <SelectInput htmlFor="to" label="To" type="to" />
      </div>
      <ResetBtn />
      <ResultText />
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      const data = await getCurrencyTypes();
      store.dispatch(setCurrencyTypes(data));
      // console.log('State on server', store.getState());
      return {
        props: {
          currencyTypes: data,
        },
      };
    }
);
