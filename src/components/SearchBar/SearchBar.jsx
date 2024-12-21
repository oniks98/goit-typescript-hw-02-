import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import css from './SearchBar.module.css';

axios.defaults.baseURL = 'https://api.unsplash.com/';
const API_KEY = 'knYehEae0WkMN_T4vgmU0_g8gFCAviIMZ5Y6O8W2n3Y';

export const fetchImages = async query => {
  const API_KEY = 'knYehEae0WkMN_T4vgmU0_g8gFCAviIMZ5Y6O8W2n3Y';
  const response = await axios.get(`search/photos`, {
    params: { query, client_id: API_KEY },
  });

  // Повертаємо лише необхідні дані
  return response.data.results.map(image => ({
    id: image.id,
    webformatURL: image.urls.small, // URL для зображення
    tags: image.alt_description || 'Image', // Альтернативний текст
  }));
};

const SearchBar = ({ onSubmit }) => {
  const notify = message => toast(message);

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const img = form.elements.img.value.trim();

    if (img === '') {
      notify('You must enter text to search for images');
      return;
    }

    onSubmit(img);
    form.reset();
  };

  return (
    <header className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="img"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.searchButton}>
          <BsSearch size={20} />
        </button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
