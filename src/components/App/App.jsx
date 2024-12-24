import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchImages } from '../../images-api.js';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';

function App() {
  const perPage = 12;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // стан для відстеження наявності  фото
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const createPagination = data => {
    if (data.images.length < perPage) {
      setHasMore(false); // зупиняємо підзавантаження, фото вже немає
      toast("We're sorry, but you've reached the end of search results.");
    }
  };

  // обробка першого пошуку
  const handleSearch = async query => {
    try {
      setQuery(query);
      setImages([]);
      setLoading(true);
      setPage(1);
      setError(null);
      setHasMore(true); // скинути при новому пошуку

      const data = await fetchImages(query, perPage, page);

      setImages(data.images);
      createPagination(data);
    } catch (error) {
      const errorMessage = `Unable to connect to server: ${error.message}; code: ${error.code}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // обробка завантаження наступних фото
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);

      const data = await fetchImages(query, perPage, nextPage);

      setImages(prevImages => [...prevImages, ...data.images]);

      createPagination(data);

      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 100); // затримка для закінчення рендеринга, інакше прокрутка не працює
    } catch (error) {
      const errorMessage = `Unable to connect to server: ${error.message}; code: ${error.code}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openModal = image => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {hasMore && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      {modalOpen && (
        <ImageModal
          isOpen={modalOpen}
          image={selectedImage}
          onClose={closeModal}
        />
      )}
      <Toaster
        position="top-center"
        toastOptions={{ className: css.toasterContainer }}
      />
    </div>
  );
}

export default App;
