import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

function ImageGallery({ items, onImageClick }) {
  return (
    <ul className={css.gallery}>
      {items.map(item => (
        <li className={css.galleryItem} key={item.id}>
          <ImageCard
            src={item.smallURL}
            alt={item.description}
            onClick={() => onImageClick(item)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
