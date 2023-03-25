import { ReactNode, useState, ChangeEvent, useRef, useEffect } from 'react';
import styles from './SelectInput.module.scss';
import InputContainer from '../inputContainer/inputContainer';
import { IoIosArrowDown } from 'react-icons/io';
import useOutsideClick from '@/hooks/useOutsideClick';

type TextInputProps = {
  htmlFor: string;
  label: string;
};

function SelectInput({ htmlFor, label }: TextInputProps) {
  const selectInputRef = useRef<null | HTMLUListElement>(null);
  const filterBtnRef = useRef<null | HTMLButtonElement>(null);

  const [dropdown, setDropDown] = useState(false);
  const [curreny, setCurrency] = useState('Currency');
  const [error, setError] = useState('');

  useOutsideClick({
    ref: selectInputRef,
    setter: setDropDown,
    exceptionElementsRef: [filterBtnRef],
  });

  const viewDropDown = () => {
    setDropDown(!dropdown);
  };

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    const value = e.target.value;
    if (!value) setError('mandatory');
    if (Number.isNaN(Number(value))) setError('must be a number');
    if (value && error) setError('');
    setCurrency(value);
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
            <span>{curreny}</span>
            <i>
              <IoIosArrowDown />
            </i>
          </button>
          {dropdown && (
            <ul
              className={`${styles.curreny__filter__dropdown}`}
              onClick={(e) => {
                if (e.target.id !== curreny) {
                  setCurrency(e.target.id);
                  setDropDown(false);
                }
              }}
              ref={selectInputRef}
            >
              <li id="africa" className={`${styles.disabled}`}>
                Africa
              </li>
              <li id="ame">Americas</li>
              <li id="oce">Oceana</li>
              <li id="europe">Europe</li>
              <li id="asia">Asia</li>
            </ul>
          )}
        </div>
        {error ? <span>{error}</span> : null}
      </InputContainer>
    </>
  );
}

export default SelectInput;
