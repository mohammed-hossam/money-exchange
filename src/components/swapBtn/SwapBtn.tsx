import styles from './SwapBtn.module.scss';
import { IoIosSwap } from 'react-icons/io';

type Props = {};

function SwapBtn({}: Props) {
  return (
    <button className={`${styles.swapBtn}`}>
      <IoIosSwap style={{ color: 'blue' }} />
    </button>
  );
}

export default SwapBtn;
