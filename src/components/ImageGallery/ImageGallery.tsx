import { ImageGalleryProps } from './ImageGallery.types'; 
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ items, onImageClick }: ImageGalleryProps) => {
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
};

export default ImageGallery;
