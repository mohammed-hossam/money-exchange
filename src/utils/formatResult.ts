import { CurrencyState } from '@/store/currencyReducer';

function formatResult(
  state: CurrencyState,
  action: { payload: number; type: string }
) {
  let finalResult = '';
  if (
    action.payload &&
    state?.from !== 'Currency' &&
    state?.to !== 'Currency'
  ) {
    const formatter1 = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: state.from,
      currencyDisplay: 'name',
    });
    const formatter2 = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: state.to,
      currencyDisplay: 'name',
    });
    const Result1 = formatter1
      .format(action.payload)
      .split(' ')
      .slice(1)
      .join(' ');
    const Result2 = formatter2
      .format(action.payload)
      .split(' ')
      .slice(1)
      .join(' ');
    finalResult = `${state.amount} ${Result1} equals ${
      action.payload * Number(state.amount)
    } ${Result2}`;
  }
  return finalResult;
}

export { formatResult };
