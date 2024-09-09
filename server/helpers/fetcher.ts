const fetchJson = async (url: string, options?: RequestInit) => {
  if (!options) options = { method: 'GET' };

  const response = await fetch(url, options);

  const data = await response.json();

  return data;
};

export default fetchJson;
