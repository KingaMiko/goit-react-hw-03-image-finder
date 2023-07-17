import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import style from './Modal.module.css';

import 'react-image-gallery/styles/css/image-gallery.css';
import Loader from '../Loader/index';

ReactModal.setAppElement('#root');

const Modal = ({ images, currentIndex, onClose }) => {
  const [loading, setLoading] = useState(true);

  const items = images.map(image => ({
    original: image.largeImageURL,
    thumbnail: image.webformatURL,
    renderItem: item => (
      <>
        <img
          src={item.original}
          onLoad={() => {
            setLoading(false);
          }}
          style={{ display: loading ? 'none' : 'block' }}
          alt=""
        />
        {loading && <Loader />}
      </>
    ),
  }));

  useEffect(() => {
    setLoading(true);
  }, [currentIndex]);

  return (
    <ReactModal
      isOpen={currentIndex !== null && currentIndex !== undefined}
      onRequestClose={onClose}
      className={style.modal}
      overlayClassName={style.overlay}
    >
      <ImageGallery
        className={loading ? style.loading : ''}
        items={items}
        startIndex={currentIndex}
        showPlayButton={false}
        showBullets={!loading}
        showNav={!loading}
        showThumbnails={false}
        showFullscreenButton={false}
        slideDuration={500}
        onSlide={index => {
          if (index !== currentIndex) {
            setLoading(true);
          }
        }}
        onImageLoad={() => setLoading(false)}
      />
    </ReactModal>
  );
};
export default Modal;
