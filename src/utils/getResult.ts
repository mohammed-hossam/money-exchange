type Props = {
  from: string;
  to: string;
  amount: string;
};

async function getResult({ from, to, amount = '1.0' }: Props) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/exchange?from=${from}&to=${to}&q=${amount}`;
    const res = await fetch(url, {
      headers: {
        'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_RAPIDKEY}`,
        'X-RapidAPI-Host': `${process.env.NEXT_PUBLIC_RAPIDHOST}`,
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
