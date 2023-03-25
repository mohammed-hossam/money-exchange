import { ReactNode } from 'react';
import styles from './inputContainer.module.scss';

type TextInputProps = {
  children: ReactNode;
  htmlFor: string;
  label: string;
};

function InputContainer({ children, htmlFor, label }: TextInputProps) {
  return (
    <div className={`${styles.inputContainer}`}>
      <label htmlFor={htmlFor} className={`${styles.label}`}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default InputContainer;
