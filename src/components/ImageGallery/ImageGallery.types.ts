import { Image } from '../App/App.types';  

export type ImageGalleryProps = {
  items: Image[];  
  onImageClick: (image: Image) => void;  
};
