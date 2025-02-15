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

type UnsplashAPIResponse = {
  results: {
    id: string;
    urls: { small: string; regular: string };
    alt_description: string;
    likes: number;
    user: {
      name: string;
      portfolio_url: string;
    };
  }[];
  total_pages: number;
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
  UnsplashAPIResponse,
  SearchBarProps,
  ImageGalleryProps,
  LoadMoreBtnProps,
  ImageModalProps,
  ErrorMessageProps,
};
