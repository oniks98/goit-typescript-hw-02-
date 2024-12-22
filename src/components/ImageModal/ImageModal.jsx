import React from 'react';
import Modal from 'react-modal';
import css from './ImageModal.module.css'; // Импортируем стили

// Устанавливаем элемент для привязки модального окна (важно для доступности)
Modal.setAppElement('#root');

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
            Автор: <a href={image.author.portfolio}>{image.author.name}</a>
          </p>
          <p>Лайков: {image.likes}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;
