const fetchGallery = (inputValue, page) => {
  const keyApi = '14392247-44ccbeebaa1260f1cbfaf64a8';
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=${page}&per_page=12&key=${keyApi}`;
  return fetch(url).then(response => response.json());
};
export default fetchGallery;
