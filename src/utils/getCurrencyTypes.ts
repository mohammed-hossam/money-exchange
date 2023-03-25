async function getCurrencyTypes() {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}/listquotes`;
    let res = await fetch(url, {
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

export { getCurrencyTypes };
