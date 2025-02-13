type Image = {
  id: string;
  smallURL: string;  
  description: string;  
  regularURL: string;
  author:  {
  name: string;
  portfolio: string;
};
  likes: number;
};

type FetchImagesResponse = {
  images: Image[];
  totalPages: number;
};

type SearchBarProps = {
  onSubmit: (query: string) => void;
};

type ImageGalleryProps = {
  items: Image[];
  onImageClick: (image: Image) => void;
};

type LoadMoreBtnProps = {
  onClick: () => void;
};

type ImageModalProps = {
  isOpen: boolean;
  image: Image | null;
  onClose: () => void;
};

type ErrorMessageProps = {
  message: string;
};


export type {
  Image,
  FetchImagesResponse,
  SearchBarProps,
  ImageGalleryProps,
  LoadMoreBtnProps,
  ImageModalProps,
  ErrorMessageProps,
};
