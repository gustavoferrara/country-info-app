const fetchJson = async (url: string, options?: RequestInit) => {
  try {
    if (!options) options = { method: 'GET' };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default fetchJson;
