import axios from 'axios';

export async function fetchImages(query, page = 1, perPage = 15) {
  const API_KEY = '47684004-d700c1255eaadac249fdd5630';
  const BASE_URL = 'https://pixabay.com/api/';

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Failed to fetch images');
  }
}
