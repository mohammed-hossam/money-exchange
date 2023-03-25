import styles from './SwapBtn.module.scss';
import { IoIosSwap } from 'react-icons/io';

type Props = {};

function SwapBtn({}: Props) {
  return (
    <button className={`${styles.swapBtn}`}>
      <span>swap the currency</span>
      <IoIosSwap />
    </button>
  );
}

export default SwapBtn;
