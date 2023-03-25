import styles from './ResultText.module.scss';

type Props = {};

function ResultText({}: Props) {
  return <p className={`${styles.resultText}`}>1 Dollar equals 0.698 Euro</p>;
}

export default ResultText;
