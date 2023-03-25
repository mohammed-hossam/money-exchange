import React from 'react';
import styles from './ResetBtn.module.scss';

type Props = {};

function ResetBtn({}: Props) {
  return <button className={`${styles.resetBtn}`}>Reset</button>;
}

export default ResetBtn;
