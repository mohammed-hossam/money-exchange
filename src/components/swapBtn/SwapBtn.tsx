import { useCallback } from 'react';
import styles from './SwapBtn.module.scss';
import { IoIosSwap } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { fetchFinalResult, swap } from '@/store/currencyReducer';
import { AnyAction } from '@reduxjs/toolkit';

function SwapBtn() {
  const dispatch = useDispatch();

  const handleSwapBtn = useCallback(() => {
    dispatch(swap());
    dispatch(fetchFinalResult() as unknown as AnyAction);
  }, [dispatch]);

  return (
    <button
      className={`${styles.swapBtn}`}
      onClick={handleSwapBtn}
      data-cy="swap"
    >
      <span>swap the currency</span>
      <IoIosSwap />
    </button>
  );
}

export default SwapBtn;
