type Props = {
  from: string;
  to: string;
  q: string;
};

async function getResult({ from, to, q }: Props) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/exchange?from=${from}&to=${to}&q=${q}`;
    const res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': '754e3bea63mshdd9b9d5fffdfc83p11763djsn19d20a66fabb',
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
      },
    });
    const data = await res.json();

    return data;
  } catch (e) {
    // console.log(e);
    throw new Error('Error happend');
  }
}

export { getResult };
