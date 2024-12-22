import css from './ImageCard.module.css';

const ImageCard = ({ src, alt, onClick }) => {
  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  };

  return (
    <div
      className={css.card}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img src={src} alt={alt} className={css.image} />
    </div>
  );
};

export default ImageCard;
