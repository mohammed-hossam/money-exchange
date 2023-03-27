import { useCallback } from 'react';
import styles from './ResetBtn.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  reset,
  selectAmount,
  selectFrom,
  selectTo,
} from '@/store/currencyReducer';

function ResetBtn() {
  const dispatch = useDispatch();
  const amount = useSelector(selectAmount);
  const from = useSelector(selectFrom);
  const to = useSelector(selectTo);

  const handleResetBtn = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      {from === 'Currency' ||
      to === 'Currency' ||
      amount === '' ||
      Number(amount) <= 0 ||
      Number.isNaN(Number(amount)) ? (
        ''
      ) : (
        <button
          className={`${styles.resetBtn}`}
          onClick={handleResetBtn}
          data-cy="reset"
        >
          Reset
        </button>
      )}
    </>
  );
}

export default ResetBtn;
