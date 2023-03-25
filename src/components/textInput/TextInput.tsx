import { ReactNode, useState, ChangeEvent } from 'react';
import styles from './TextInput.module.scss';
import InputContainer from '../inputContainer/inputContainer';

type TextInputProps = {
  // children: ReactNode;
};

function TextInput({}: TextInputProps) {
  const [amount, setAmount] = useState('1.0');
  const [error, setError] = useState('');
  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
    const value = e.target.value;
    if (!value) setError('mandatory');
    if (Number.isNaN(Number(value))) setError('must be a number');
    if (value && error) setError('');
    setAmount(value);
  }

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
        {error ? <span>{error}</span> : null}
      </InputContainer>
    </>
  );
}

export default TextInput;
