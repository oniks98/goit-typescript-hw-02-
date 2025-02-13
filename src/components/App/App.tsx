import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchImages } from '../../images-api';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import { Image, FetchImagesResponse } from './App.types';

function App() {
  const perPage = 12;

  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;

    const loadImages = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data: FetchImagesResponse = await fetchImages(query, perPage, page);

        setImages(prevImages =>
          page === 1 ? data.images : [...prevImages, ...data.images]
        );
        setTotalPages(data.totalPages);

        if (data.images.length === 0 || page >= data.totalPages) {
          toast("We're sorry, but you've reached the end of search results.");
        }

        setTimeout(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }, 100);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(`Unable to load images: ${error.message}`);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [query, page]);

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setTotalPages(0);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" toastOptions={{ className: css.toasterContainer }} />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && (
        <>
          <ImageGallery items={images} onImageClick={openModal} />
          {page < totalPages && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}
      {isModalOpen && (
        <ImageModal isOpen={isModalOpen} image={selectedImage} onClose={closeModal} />
      )}
    </div>
  );
}

export default App;
