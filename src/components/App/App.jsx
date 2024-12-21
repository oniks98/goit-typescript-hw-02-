import { useState, useEffect } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
// import ErrorMessage from '../ErrorMessage/ErrorMessage';
// import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
// import ImageModal from '../ImageModal/ImageModal';
import { fetchImages } from '../SearchBar/SearchBar';
import css from './App.module.css';

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async images => {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      const data = await fetchImages(images);
      setImages(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
    </>
  );
}

export default App;
