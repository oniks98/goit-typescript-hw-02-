import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ items }) => {
  return (
    <ul className={css.gallery}>
      {items.map(({ id, webformatURL, tags }) => (
        <li key={id} className={css.galleryItem}>
          <ImageCard src={webformatURL} alt={tags} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
