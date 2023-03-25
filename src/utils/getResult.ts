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
