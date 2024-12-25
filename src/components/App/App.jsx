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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isHasMore, setIsHasMore] = useState(true); // стан для відстеження наявності  фото
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // загальна функція для пошуку
  const loadImages = async (query, page, isNewSearch = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchImages(query, perPage, page);

      setImages(prevImages =>
        isNewSearch ? data.images : [...prevImages, ...data.images]
      );

      if (data.images.length < perPage) {
        setIsHasMore(false); // зупиняємо підзавантаження, фото вже немає
        toast("We're sorry, but you've reached the end of search results.");
      }
    } catch (error) {
      const errorMessage = `Unable to load images: ${error.message}; code: ${error.code}`;
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // пошук  зображення
  const handleSearch = async query => {
    setQuery(query);
    setPage(1);
    setIsHasMore(true);
    setImages([]);
    await loadImages(query, page, true);
  };

  // пошук наступних зображень
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await loadImages(query, nextPage);
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 100); // затримка для прокрутки після рендерингу
  };

  const openModal = image => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Toaster
        position="top-center"
        toastOptions={{ className: css.toasterContainer }}
      />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {isHasMore && !isLoading && <LoadMoreBtn onClick={handleLoadMore} />}
        </>
      )}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;
