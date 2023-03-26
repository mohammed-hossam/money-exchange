import { useCallback, useState, useRef } from 'react';
import styles from './SelectInput.module.scss';
import InputContainer from '../inputContainer/inputContainer';
import { IoIosArrowDown } from 'react-icons/io';
import useOutsideClick from '@/hooks/useOutsideClick';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrencyTypes,
  selectFrom,
  selectTo,
  setFrom,
  setTo,
  fetchFinalResult,
} from '@/store/currencyReducer';
import { AnyAction } from '@reduxjs/toolkit';

type TextInputProps = {
  htmlFor: string;
  label: string;
  type: 'from' | 'to';
  // currencyTypes: CurrencyTypes;
};

function SelectInput({ htmlFor, label, type }: TextInputProps) {
  const currencyTypes = useSelector(selectCurrencyTypes);
  const from = useSelector(selectFrom);
  const to = useSelector(selectTo);
  const dispatch = useDispatch();
  const currency = type === 'from' ? from : to;
  const reverseCurrency = type === 'from' ? to : from;
  const selectInputRef = useRef<null | HTMLUListElement>(null);
  const filterBtnRef = useRef<null | HTMLButtonElement>(null);

  const [dropdown, setDropDown] = useState(false);

  useOutsideClick({
    ref: selectInputRef,
    setter: setDropDown,
    exceptionElementsRef: [filterBtnRef],
  });

  const viewDropDown = () => {
    setDropDown(!dropdown);
  };

  function handleInput(e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = e.target as HTMLInputElement;

    if (target.id !== currency && target.id !== reverseCurrency) {
      // setCurrency(target.id);
      if (type === 'from') {
        dispatch(setFrom(target.id));
        if (to !== 'Currency')
          dispatch(fetchFinalResult() as unknown as AnyAction);
      } else {
        dispatch(setTo(target.id));
        if (from !== 'Currency')
          dispatch(fetchFinalResult() as unknown as AnyAction);
      }
      setDropDown(false);
    }
  }

  return (
    <>
      <InputContainer htmlFor={htmlFor} label={label}>
        <div className={`${styles.curreny}`}>
          <button
            ref={filterBtnRef}
            id="curreny__filter__button"
            className={`${styles.curreny__filter__button}`}
            onClick={viewDropDown}
          >
            <span>{currency}</span>
            <i>
              <IoIosArrowDown />
            </i>
          </button>
          {dropdown && (
            <ul
              className={`${styles.curreny__filter__dropdown}`}
              onClick={handleInput}
              ref={selectInputRef}
            >
              {currencyTypes.map((el) => {
                return (
                  <li
                    id={el}
                    className={`${
                      el === currency || el === reverseCurrency
                        ? styles.disabled
                        : ''
                    }`}
                    key={el}
                  >
                    {el}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </InputContainer>
    </>
  );
}

export default SelectInput;
