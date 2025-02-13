import { Image } from '../App/App.types';  

export type ImageModalProps = {
  isOpen: boolean;
  image: Image | null;
  onClose: () => void;
};
