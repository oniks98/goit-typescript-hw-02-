import css from './ImageCard.module.css';

const ImageCard = ({ src, alt }) => {
  return (
    <div className={css.card}>
      <img src={src} alt={alt} className={css.image} />
    </div>
  );
};

export default ImageCard;
