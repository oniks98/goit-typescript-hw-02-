import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchImages } from '../../images-api.js';
import css from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Состояние для отслеживания доступности данных
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Обработка поиска
  const handleSearch = async searchQuery => {
    try {
      setQuery(searchQuery);
      setImages([]);
      setLoading(true);
      setPage(1);
      setError(null);
      setHasMore(true); // Сбрасываем флаг при новом поиске

      const data = await fetchImages(searchQuery, 12, 1);

      setImages(data.images);
      if (data.images.length < 12) {
        setHasMore(false); // Если меньше 12 изображений, данных больше нет
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = `Unable to connect to server: ${error.message}; code: ${errorCode}`;

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Обработка загрузки следующих изображений
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      setPage(nextPage);

      const data = await fetchImages(query, 12, nextPage);

      setImages(prevImages => [...prevImages, ...data.images]);

      if (data.images.length < 12) {
        setHasMore(false); // Если данных меньше 12, останавливаем подгрузку
      }

      // Прокрутка вниз после загрузки
      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }, 100); // Небольшая задержка для завершения рендеринга
    } catch (error) {
      const errorMessage = 'Ошибка при загрузке дополнительных изображений:';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Открытие модального окна
  const openModal = image => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />} {/* Иконка загрузки */}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {/* Отображаем кнопку только если есть ещё данные */}
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
    </div>
  );
}

export default App;
