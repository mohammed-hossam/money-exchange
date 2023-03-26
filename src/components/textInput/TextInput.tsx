import { useState, ChangeEvent, useEffect, useCallback } from 'react';
import styles from './TextInput.module.scss';
import InputContainer from '../inputContainer/inputContainer';
import useDebounce from '@/hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFinalResult,
  resetResult,
  selectAmount,
  setAmount,
} from '@/store/currencyReducer';
import { AnyAction } from '@reduxjs/toolkit';
type TextInputProps = {
  // children: ReactNode;
};

function TextInput({}: TextInputProps) {
  const dispatch = useDispatch();
  const amount = useSelector(selectAmount);
  const debouncedAmount = useDebounce(amount, 2000);
  const [error, setError] = useState('');

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      dispatch(setAmount(value));

      if (!value) {
        setError('mandatory');
        dispatch(resetResult());
      } else if (Number.isNaN(Number(value))) {
        setError('must be a number');
        dispatch(resetResult());
      } else if (value && Number(value) <= 0) {
        setError('must be > 0');
        dispatch(resetResult());
      } else {
        setError('');
      }
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchFinalResult() as unknown as AnyAction);
  }, [dispatch, debouncedAmount]);

  return (
    <>
      <InputContainer htmlFor="amount" label="Amount">
        <input
          id="amount"
          name="amount"
          type="number"
          onChange={handleInput}
          value={amount}
          placeholder="0.0"
          className={`${styles.input}`}
        />
        {error ? <span className={`${styles.error}`}>{error}</span> : null}
      </InputContainer>
    </>
  );
}

export default TextInput;
