import styles from './ResultText.module.scss';
import { useSelector } from 'react-redux';
import {
  selectAmount,
  selectFetchingLoading,
  selectFrom,
  selectResult,
  selectTo,
} from '@/store/currencyReducer';

function ResultText() {
  const result = useSelector(selectResult);
  const amount = useSelector(selectAmount);
  const from = useSelector(selectFrom);
  const to = useSelector(selectTo);
  const load = useSelector(selectFetchingLoading);

  return (
    <>
      <div className={`${styles.container}`}>
        {from === 'Currency' || to === 'Currency' || amount === '' ? (
          ''
        ) : (
          <p className={`${styles.resultText}`} data-cy="resultText">
            {result}
          </p>
        )}
        {load && <p className={`${styles.loader}`}></p>}
      </div>
    </>
  );
}

export default ResultText;
