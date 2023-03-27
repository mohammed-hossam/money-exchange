import { formatResult } from '../../src/utils/formatResult';

describe('utils', function () {
  it('format', function () {
    const state = {
      amount: '1.0',
      from: 'Eur',
      to: 'USD',
      result: '',
      currencyTypes: [],
      status: 'idle',
      serverError: '',
      fetchingLoading: false,
    };
    const finaleResult = formatResult(state, { payload: 1234, type: 'test' });
    expect(finaleResult).eql('1.0 Euro equals 1234 US-Dollar');
  });
});

export {};
