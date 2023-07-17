import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import style from './Modal.module.css';
import Loader from '../Loader'; // zaimportuj swój komponent loadera

import 'react-image-gallery/styles/css/image-gallery.css';

ReactModal.setAppElement('#root');

const Modal = ({ images, currentIndex, onClose }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [currentIndex]);

  const items = images.map(image => ({
    original: image.largeImageURL,
    thumbnail: image.webformatURL,
  }));

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <ReactModal
      isOpen={currentIndex !== null && currentIndex !== undefined}
      onRequestClose={onClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      {!loaded && <Loader />}{' '}
      {/* Wyświetlanie loadera jeżeli obraz nie został załadowany */}
      <img
        src={items[currentIndex]?.original}
        style={{ display: 'none' }}
        onLoad={handleLoad}
        alt="Invisible"
      />{' '}
      {/* Niewidoczny obrazek służący do zmiany stanu loaded */}
      {loaded && ( // Dodajemy warunek na wyświetlanie galerii
        <ImageGallery
          items={items}
          startIndex={currentIndex}
          showPlayButton={false}
          showBullets={true}
          showNav={true}
          showThumbnails={false}
          showFullscreenButton={false}
          slideDuration={500}
        />
      )}
    </ReactModal>
  );
};

export default Modal;
