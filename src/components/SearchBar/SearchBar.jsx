import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';

import css from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (query === '') {
      toast('You must enter text to search for images');
      return;
    }

    onSubmit(query);
    form.reset();
  };

  return (
    <header className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="query"
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
    </header>
  );
};

export default SearchBar;
