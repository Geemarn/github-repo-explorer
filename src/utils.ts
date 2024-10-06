export const ERR_MESSAGE = 'An error occurred while fetching the data.';
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw { message: ERR_MESSAGE };
  }
  return res.json();
};
