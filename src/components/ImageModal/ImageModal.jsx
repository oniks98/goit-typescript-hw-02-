import Modal from 'react-modal';
import css from './ImageModal.module.css';

function ImageModal({ isOpen, image, onClose }) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Image Modal"
    >
      <button onClick={onClose} className={css.modalCloseButton}>
        &times;
      </button>
      <div>
        <img
          src={image.regularURL}
          alt={image.description}
          className={css.modalImage}
        />
        <div className={css.modalInfo}>
          <h2>{image.description}</h2>
          <p>
            Author: <a href={image.author.portfolio}>{image.author.name}</a>
          </p>
          <p>Likes: {image.likes}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;
