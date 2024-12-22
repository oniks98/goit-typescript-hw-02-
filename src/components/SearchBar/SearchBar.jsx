import { BsSearch } from 'react-icons/bs';
import toast, { Toaster } from 'react-hot-toast';

import css from './SearchBar.module.css';

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
      </form>
      <Toaster position="top-left" />
    </header>
  );
};

export default SearchBar;
